const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPaassMatched } = require("../../utils/helpers");

// admin register

exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin Exists");
  }

  const user = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin registered successfully",
  });
});
// admin login
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    res.json({ message: "User not found" });
  }
  // verify password
  const isMatched = await isPaassMatched(password, user.password);
  if (!isMatched) {
    res.json({ message: "Wrong password" });
  } else {
    const admin = await Admin.findById(user._id).select("role");

    return res.json({
      data: generateToken(user._id),
      role: admin,
      message: "Admin logged in successfully",
    });
  }
});

// Get all admins
exports.getAdminsCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "Admin fetched successfully",
    data: admin,
  });
});

// Get singel admin (currnt logedin user)
exports.getAdminCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin profile fetched in successfully",
    });
  }
});

// Update admin
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body;
  // if email is alredy exist
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken");
  }
  // check if iser ubdating password
  if (password) {
    // hash password
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

// delete admin
exports.delteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Delete admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin suspending teacher
exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin suspending teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin Unsuspending teacher
exports.adminUnsuspendingTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin Unsuspending teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin withdrawing teacher
exports.adminWithdrawingTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin Unwithdrawing teacher
exports.adminUnwithdrawingTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin Unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin puplish exam results
exports.adminPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin publish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//  admin Unpuplish exam results
exports.adminUnpuplishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unpublish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
