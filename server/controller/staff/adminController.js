const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
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
    password,
  });
  res.status(201).json({
    status: "success",
    data: user,
  });
});
// admin login
exports.loginAdminCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    }
    if (user && (await user.verifyPassword(password))) {
      return res.json({ data: user });
    } else {
      res.json({ message: "Invalid login" });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

// Get all admins
exports.getAdminsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "All admins",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

// Get singel admin
exports.getAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "single admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

// Update admin
exports.updateAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Update admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

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
