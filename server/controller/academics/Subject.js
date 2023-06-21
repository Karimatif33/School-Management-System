const AsyncHandler = require("express-async-handler");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");

// subject created
exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, createdBy, academicTerm } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name");

  const ProgramFound = await Program.findById(req.params.ProgramID);
  if (!ProgramFound) {
    throw new Error("Program Not Found");
  }

  const SubjectExist = await Subject.findOne({ name });
  if (SubjectExist) {
    throw new Error("Subject Exist");
  }
  const SubjectCreated = await Subject.create({
    name,
    description,
    createdBy: adminName,
    academicTerm,
  });
  // push ClassLevel into admin
  ProgramFound.subjects.push(SubjectCreated._id);
  await ProgramFound.save();
  res.status(201).json({
    status: "success",
    message: "Subject created successfuly",
    data: SubjectCreated,
  });
});
// get all subject
exports.getSubjects = AsyncHandler(async (req, res) => {
  const subject = await Subject.find();
  res.status(200).json({
    status: "success",
    message: "Subject fetched successfully",
    data: subject,
  });
});
// Get singel subject
exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    throw new Error("Subject not found");
  } else {
    res.status(200).json({
      status: "success",
      data: subject,
      message: "current subject fetched in successfully",
    });
  }
});
// Update subject
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name");
  // if subject is alredy exist
  const nameExist = await Subject.findOne({ name });
  if (nameExist) {
    throw new Error("Subject alredy Exist");
  }

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: subject,
    message: "Subject updated successfully",
  });
});
// delete subject
exports.delteSubject = AsyncHandler(async (req, res) => {
const ProgramID = await Subject.findById(req.params.ProgramID)
// await Subject.findByIdAndDelete(req.params.ProgramID);
  const ProgramFound = await Program.find({ subjects: { $eq: req.params.ProgramID } })
  // Program.subjects.pull([req.params.id]);
    // await Program.save();
  console.log(ProgramFound,"test");
  try {
    res.status(201).json({
      status: "success",
      data: "Delete subject",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});
