const express = require("express");
const {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  delteProgram,
} = require("../../controller/academics/program");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const programRouter = express.Router();

// Program created
programRouter.post("/", isLogin, isAdmin, createProgram);

// get all Program
programRouter.get("/", isLogin, isAdmin, getPrograms);

// Get singel Program
programRouter.get("/:id", isLogin, getProgram);

// Update Program
programRouter.put("/:id", isLogin, isAdmin, updateProgram);

// delete Program
programRouter.delete("/:id",isLogin,isAdmin, delteProgram);

module.exports = programRouter;
