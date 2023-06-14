const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
      required: true,
      default: teacherIdGenerator()
    },
    role: {
      type: String,
      default: "student",
    },
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true,
      },
    ],
    currentClassLevel: {
      type: String,
      default: function () {
        return this.classLevels[this.classLevels.length - 1];
      },
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    dateAdmititted: {
      type: Date,
      default: Date.now,
    },
    examResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamResult",
      },
    ],
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    academicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    isPromotedToLevel200: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel300: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel400: {
      type: Boolean,
      default: false,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    prefectName: {
      type: String,
    },
    //   behaviorReport: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "BehaviorReport",
    //     },
    //   ],
    //   financialReport: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "FinancialReport",
    //     },
    //   ],
    yearGraduated: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const teacherIdGenerator = {
  counter: 1 + Date().toString().slice(13, 15) + 0 + 0 + 1,
  generateTeacherId: function () {
    this.counter++;
    return "STU" + this.counter;
  },
}

// model
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
