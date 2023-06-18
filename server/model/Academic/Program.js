const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProgramSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "4 years",
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
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    // will push the teachers that are in charge of the program
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    // will push the subjects that are in the program when the program is created
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// model
const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
