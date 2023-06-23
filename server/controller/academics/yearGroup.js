const AsyncHandler = require("express-async-handler");
const YearGroup = require("../../model/Academic/YearGroup");
const Admin = require("../../model/Staff/Admin");

// subject yearGroup
exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, createdBy, academicYear } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name");



  const yearGroupExist = await YearGroup.findOne({ name });
  if (yearGroupExist) {
    throw new Error("year Group Exist");
  }
  const yearGroupCreated = await YearGroup.create({
    name,
    createdBy: adminName,
    academicYear,
  });
  // push ClassLevel into admin
  const admin = await Admin.findById(req.userAuth._id)
  admin.yearGroup.push(yearGroupCreated._id)
  await admin.save()
  res.status(201).json({
    status:"success",
    message: "year Group created successfuly",
    data: yearGroupCreated,
  })
});
// get all yearGroups
exports.getYearGroups = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.find();
  res.status(200).json({
    status: "success",
    message: "YearGroup fetched successfully",
    data: yearGroup,
  });
});
// Get singel yearGroup
exports.getYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  if (!yearGroup) {
    throw new Error("Subject not found");
  } else {
    res.status(200).json({
      status: "success",
      data: yearGroup,
      message: "current YearGroup fetched in successfully",
    });
  }
});
// Update yearGroup
exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, createdBy, academicYear } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name");
  // if subject is alredy exist
  const nameExist = await YearGroup.findOne({ name });
  if (nameExist) {
    throw new Error("yearGroup alredy Exist");
  }

  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: yearGroup,
    message: "yearGroup updated successfully",
  });
});
// delete yearGroup
exports.delteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id)
  const admin = await Admin.findById(req.userAuth._id)
  admin.yearGroup.pull(req.params.id)
   await admin.save()
  //  console.log(admin)
 try {
   res.status(201).json({
     status: "success",
     data: "Delete yearGroup",
   });
 } catch (error) {
   res.json({
     status: "failed",
     error: error.message,
   });
 }
}) 