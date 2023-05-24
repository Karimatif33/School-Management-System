const mongoose = require("mongoose");
const { Schema } = mongoose;
const examSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    progrm: {
      type: Schema.Types.ObjectId,
      ref: "Progrm",
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    progrm: {
      type: Number,
      required: true,
      default: 100,
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    examType: {
      type: String,
      required: true,
      default: "Quiz",
    },
    examStatus: {
      type: String,
      required: true,
      enum: ["pending", "live"],
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    academicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model
const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
