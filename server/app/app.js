const express = require("express");
const morgan = require("morgan");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTermRouter");
const classLevelRouter = require("../routes/academics/classLevelRouter");
const programRouter = require("../routes/academics/programRouter");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes

// adminRoutes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-level", classLevelRouter);
app.use("/api/v1/programs", programRouter);
// Error handler middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
