const express = require("express");
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYear,
  updateAcademicYear,
  delteAcademicYears,
} = require("../../controller/academics/academicYear");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter = express.Router();

// AcademicYear created
academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);

// get all AcademicYears
academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);

// Get singel AcademicYear
academicYearRouter.get("/:id", isLogin, getAcademicYear);

// Update AcademicYear
academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);

// delete AcademicYear
academicYearRouter.delete("/:id",isLogin,isAdmin, delteAcademicYears);

module.exports = academicYearRouter;
