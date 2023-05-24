const mongoose = require("mongoose");
const { Schema } = mongoose;
const ClassLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    // students will be added to the class level when they are registered
    students: [
        {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
      subjects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
      teachers: [
        {
          type: Schema.Types.ObjectId,
          ref: "Teacher",
        },
      ],
  },
  {
    timestamps: true,
  }
);

// model
const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);
module.exports = ClassLevel;
