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
// delete subject
exports.delteSubject = AsyncHandler(async (req, res) => {
  const programID = req.params.ProgramID;
 // Find the Subject by ID and remove it
 await Subject.findByIdAndDelete(programID);

 // Find the Program(s) that contain the deleted Subject and update the subjects array
 const programsToUpdate = await Program.find({ subjects: programID });

 // Iterate over the found programs and remove the subject from the subjects array
 for (const program of programsToUpdate) {
   program.subjects.pull(programID);
   await program.save();
 }
    // console.log(program,"test");
    try {
      res.status(201).json({
        status: "success",
        data: "subject Deleted ",
      });
    } catch (error) {
      res.json({
        status: "failed",
        error: error.message,
      });
    }
  });
  
