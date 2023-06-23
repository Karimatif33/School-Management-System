const mongoose = require("mongoose");
const { Schema } = mongoose;
const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // created automaticlly code
    // CSFTY
    code: {
      type: String,
      // required: true,
      default: function () {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() + '-' +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(1 + Math.random() * 9)
        );
      },
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Tracher",
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    duration: {
        type: String,
        required: true,
        default: "3 months",
      },
  },
  {
    timestamps: true,
  }
);

// model
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
