const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear, createdBy } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name")

  const academicExist = await AcademicYear.findOne({ name });
  if (academicExist) {
    throw new Error("AcademicYear Exists");
  }
  const academicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: admin,
  });
  res.status(201).json({
    status:"success",
    message: "Academic Year created successfuly",
    data: academicYear,
  })

  
});
