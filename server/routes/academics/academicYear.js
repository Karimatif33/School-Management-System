const express = require("express");
const {
  createAcademicYear,
} = require("../../controller/academics/academicYear");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter = express.Router();
academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);

module.exports = academicYearRouter