const express = require("express");
const {
  createAcademicTerm,
  getAcademicTerms,
  getAcademicTerm,
  updateAcademicTerm,
  delteAcademicTerm,
} = require("../../controller/academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicTermRouter = express.Router();

// AcademicTerm created
academicTermRouter.post("/", isLogin, isAdmin, createAcademicTerm);

// get all AcademicTerms
academicTermRouter.get("/", isLogin, isAdmin, getAcademicTerms);

// Get singel AcademicTerms
academicTermRouter.get("/:id", isLogin, getAcademicTerm);

  // Update AcademicTerms
academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicTerm);

// delete AcademicTerms
academicTermRouter.delete("/:id", isLogin, isAdmin, delteAcademicTerm);

module.exports = academicTermRouter;
