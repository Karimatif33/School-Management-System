const express = require("express");
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  delteSubject,
} = require("../../controller/academics/Subject");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const SubjectRouter = express.Router();

// Subject created
SubjectRouter.post("/:ProgramID", isLogin, isAdmin, createSubject);

// get all Subject
SubjectRouter.get("/", isLogin, isAdmin, getSubjects);

// Get singel Subject
SubjectRouter.get("/:id", isLogin, getSubject);

// Update Subject
SubjectRouter.put("/:id", isLogin, isAdmin, updateSubject);

// delete Subject
SubjectRouter.delete("/:ProgramID",isLogin,isAdmin, delteSubject);

module.exports = SubjectRouter;
