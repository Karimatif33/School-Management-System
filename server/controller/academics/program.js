const AsyncHandler = require("express-async-handler");
const classLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");

// Program created
exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name");

  const ProgramExist = await Program.findOne({ name });
  if (ProgramExist) {
    throw new Error("Program Exist");
  }

  // const lastCode = await Program.findOne(
  //   {},
  //   { code: 1 },
  //   { sort: { code: -1 } }
  // );
  // const newCode = lastCode ? lastCode.code + 100 : 100;

  const ProgramCreated = await Program.create({
    name,
    description,
    createdBy: adminName,
    // code: newCode,
  });
  // const programCreated = await ProgramCreated.save();
  // push Program into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.program.push(ProgramCreated._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Program created successfuly",
    data: ProgramCreated,
  });
});
// get all Program
exports.getPrograms = AsyncHandler(async (req, res) => {
  const program = await Program.find();
  res.status(200).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});
// Get singel Program
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) {
    throw new Error("program not found");
  } else {
    res.status(200).json({
      status: "success",
      data: program,
      message: "current program fetched in successfully",
    });
  }
});
// Update Program
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  // if Program is alredy exist
  const nameExist = await Program.findOne({ name });
  if (nameExist) {
    throw new Error("Program alredy Exist");
  }

  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: program,
    message: "Program updated successfully",
  });
});
// delete Program
exports.delteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  const admin = await Admin.findById(req.userAuth._id);
  admin.program.pull([req.params.id]);
  await admin.save();
  console.log(admin);
  try {
    res.status(201).json({
      status: "success",
      data: "Delete ClassLevel",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});
