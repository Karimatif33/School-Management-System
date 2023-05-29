const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

// AcademicYear created
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear, createdBy } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name")

  const academicExist = await AcademicYear.findOne({ name });
  if (academicExist) {
    throw new Error("AcademicYear Exists");
  }
  const academicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: adminName,
  });
  // push academicYear into admin
  const admin = await Admin.findById(req.userAuth._id)
  admin.academicYears.push(academicYear._id)
  await admin.save()
  res.status(201).json({
    status:"success",
    message: "Academic Year created successfuly",
    data: academicYear,
  })

  
});
// get all AcademicYears
exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.find();
    res.status(200).json({
      status: "success",
      message: "Academic Years fetched successfully",
      data: academicYear,
    });
  });
// Get singel AcademicYears
exports.getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findById(req.params.id)
      if (!academicYear) {
        throw new Error("academicYear not found");
      } else {
        res.status(200).json({
          status: "success",
          data: academicYear,
          message: "current academicYear fetched in successfully",
        });
      }
  });
  // Update AcademicYears
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear, updatedBy } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name")
  // if AcademicYear is alredy exist
  const nameExist = await AcademicYear.findOne({ name });
  if (nameExist) {
    throw new Error("AcademicYear alredy Exist");
  }

    const academicYear = await AcademicYear.findByIdAndUpdate(
      req.params.id,
      {
        name,
        fromYear,
        toYear,
        updatedBy: admin,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: academicYear,
      message: "AcademicYear updated successfully",
    });
});
// delete AcademicYears
exports.delteAcademicYears =AsyncHandler(async (req, res) => {
   await AcademicYear.findByIdAndDelete(req.params.id)
    
  try {
    res.status(201).json({
      status: "success",
      data: "Delete academicYear",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
}) 