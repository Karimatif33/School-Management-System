const express = require("express");
const morgan = require("morgan");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTermRouter");
const adminRouter = require("../routes/staff/adminRouter");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes

// adminRoutes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);

// Error handler middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
