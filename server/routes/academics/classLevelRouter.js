const express = require("express");
const {
  createClassLevel,
  getClassLevels,
  getClassLevel,
  updateClassLevel,
  delteClassLevel,
} = require("../../controller/academics/classLevel");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();

// classLevel created
classLevelRouter.post("/", isLogin, isAdmin, createClassLevel);

// get all classLevel
classLevelRouter.get("/", isLogin, isAdmin, getClassLevels);

// Get singel classLevel
classLevelRouter.get("/:id", isLogin, getClassLevel);

// Update classLevel
classLevelRouter.put("/:id", isLogin, isAdmin, updateClassLevel);

// delete classLevel
classLevelRouter.delete("/:id",isLogin,isAdmin, delteClassLevel);

module.exports = classLevelRouter;
