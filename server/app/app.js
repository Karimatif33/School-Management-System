const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes

// adminRoutes
app.use("/api/v1/admins", adminRouter);

// Error handler middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
