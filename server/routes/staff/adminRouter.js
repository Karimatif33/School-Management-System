const express = require("express");
const adminRouter = express.Router();
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  getAdminCtrl,
  updateAdminCtrl,
  delteAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnsuspendingTeacherCtrl,
  adminWithdrawingTeacherCtrl,
  adminUnwithdrawingTeacherCtrl,
  adminPublishResultsCtrl,
  adminUnpuplishResultsCtrl,
} = require("../../controller/staff/adminController");
const isLogin = require("../../middlewares/isLogin")

// admin register
adminRouter.post("/register", registerAdminCtrl);

// admin login
adminRouter.post("/login", loginAdminCtrl);

// Get all admins
adminRouter.get("/", getAdminsCtrl);

// Get singel admin
adminRouter.get("/:id",isLogin ,getAdminCtrl);

// Update admin
adminRouter.put("/:id", updateAdminCtrl);

// delete admin
adminRouter.delete("/:id", delteAdminCtrl);

//  admin suspending teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

//  admin Unsuspending teacher
adminRouter.put("/Unsuspending/teacher/:id", adminUnsuspendingTeacherCtrl);

//  admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawingTeacherCtrl);

//  admin Unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawingTeacherCtrl);

//  admin puplish exam results
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);

//  admin Unpuplish exam results
adminRouter.put("/unpublish/exam/:id", adminUnpuplishResultsCtrl);
module.exports = adminRouter;
