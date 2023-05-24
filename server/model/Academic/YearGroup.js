const mongoose = require("mongoose");
const { Schema } = mongoose;
const yearGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model
const YearGroupTerm = mongoose.model("YearGroupTerm", yearGroupSchema);
module.exports = YearGroupTerm;
