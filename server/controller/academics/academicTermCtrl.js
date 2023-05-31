const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");

// AcademicTerm created
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration, createdBy } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name")

  const AcademicTermExist = await AcademicTerm.findOne({ name });
  if (AcademicTermExist) {
    throw new Error("AcademicTerm Exists");
  }
  const AcademicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: adminName,
  });
  // push AcademicTerm into admin
  const admin = await Admin.findById(req.userAuth._id)
  admin.academicTerms.push(AcademicTermCreated._id)
  await admin.save()
  res.status(201).json({
    status:"success",
    message: "Academic Term created successfuly",
    data: AcademicTermCreated,
  })

  
});
// get all AcademicTerms
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.find();
    res.status(200).json({
      status: "success",
      message: "Academic Term fetched successfully",
      data: academicTerm,
    });
  });
// Get singel AcademicTerms
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findById(req.params.id)
      if (!academicTerm) {
        throw new Error("academicYear not found");
      } else {
        res.status(200).json({
          status: "success",
          data: academicTerm,
          message: "current AcademicTerm fetched in successfully",
        });
      }
  });
  // Update AcademicTerms
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration, updatedBy } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name")
  // if AcademicTerm is alredy exist
  const nameExist = await AcademicTerm.findOne({ name });
  if (nameExist) {
    throw new Error("AcademicTerm alredy Exist");
  }

    const academicYear = await AcademicTerm.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        duration,
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
// delete AcademicTerms
exports.delteAcademicTerm =AsyncHandler(async (req, res) => {
   await AcademicTerm.findByIdAndDelete(req.params.id)
   const admin = await Admin.findOne()
   admin.academicTerms.pull([req.params.id])
   await admin.save()
   console.log(admin)
  try {
    res.status(201).json({
      status: "success",
      data: "Delete AcademicTerm",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
}) 