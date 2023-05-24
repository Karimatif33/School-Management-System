const express = require("express");
const adminRouter = express.Router();

// admin register
adminRouter.post("/register", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin has been registered",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

// admin login
adminRouter.post("/login", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin has been logedin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

// Get all admins
adminRouter.get("/", (req, res) => {
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
});

// Get singel admin
adminRouter.get("/:id", (req, res) => {
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
});

// Update admin
adminRouter.put("/:id", (req, res) => {
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
});

// delete admin
adminRouter.delete("/:id", (req, res) => {
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
});

//  admin suspending teacher
adminRouter.put("/suspend/teacher/:id", (req, res) => {
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
});

//  admin Unsuspending teacher
adminRouter.put("/Unsuspending/teacher/:id", (req, res) => {
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
});

//  admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", (req, res) => {
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
});

//  admin Unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", (req, res) => {
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
});

//  admin puplish exam results
adminRouter.put("/publish/exam/:id", (req, res) => {
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
});

//  admin Unpuplish exam results
adminRouter.put("/unpublish/exam/:id", (req, res) => {
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
});
module.exports = adminRouter;
