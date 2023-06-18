const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const classLevel = require("../../model/Academic/ClassLevel");

const Admin = require("../../model/Staff/Admin");

// ClassLevel created
exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;
  const adminName = await Admin.findById(req.userAuth._id).select("name")

  const ClassLevelExist = await classLevel.findOne({ name });
  if (ClassLevelExist) {
    throw new Error("Class Level Exist");
  }
  const ClassLevelCreated = await classLevel.create({
    name,
    description,
    createdBy: adminName,
  });
  // push ClassLevel into admin
  const admin = await Admin.findById(req.userAuth._id)
  admin.classLevel.push(ClassLevelCreated._id)
  await admin.save()
  res.status(201).json({
    status:"success",
    message: "ClassLevel created successfuly",
    data: ClassLevelCreated,
  })

  
});
// get all ClassLevel
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const ClassLevel = await classLevel.find();
    res.status(200).json({
      status: "success",
      message: "Class Level fetched successfully",
      data: ClassLevel,
    });
  });
// Get singel ClassLevel
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const ClassLevel = await classLevel.findById(req.params.id)
      if (!ClassLevel) {
        throw new Error("ClassLevel not found");
      } else {
        res.status(200).json({
          status: "success",
          data: ClassLevel,
          message: "current ClassLevel fetched in successfully",
        });
      }
  });
  // Update ClassLevel
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description, updatedBy } = req.body;
  const admin = await Admin.findById(req.userAuth._id).select("name")
  // if ClassLevel is alredy exist
  const nameExist = await classLevel.findOne({ name });
  if (nameExist) {
    throw new Error("classLevel alredy Exist");
  }

    const ClassLevel = await classLevel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        updatedBy: admin,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: ClassLevel,
      message: "ClassLevel updated successfully",
    });
});
// delete ClassLevel
exports.delteClassLevel =AsyncHandler(async (req, res) => {
   await classLevel.findByIdAndDelete(req.params.id)
   const admin = await Admin.findById(req.userAuth._id)
   admin.classLevel.pull([req.params.id])
    await admin.save()
    console.log(admin)
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
}) 