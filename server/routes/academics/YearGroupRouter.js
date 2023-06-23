const express = require("express");
const {
  createYearGroup,
  getYearGroups,
  getYearGroup,
  updateYearGroup,
  delteYearGroup,
} = require("../../controller/academics/yearGroup");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const yearGroupRouter = express.Router();

// yearGroup created
yearGroupRouter.post("/", isLogin, isAdmin, createYearGroup);

// get all yearGroups
yearGroupRouter.get("/", isLogin, isAdmin, getYearGroups);

// Get singel yearGroup
yearGroupRouter.get("/:id", isLogin, getYearGroup);

// Update yearGroup
yearGroupRouter.put("/:id", isLogin, isAdmin, updateYearGroup);

// delete yearGroup
yearGroupRouter.delete("/:id",isLogin,isAdmin, delteYearGroup);

module.exports = yearGroupRouter;
