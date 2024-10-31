import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    teacherPositionsId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" },
    ],
    degrees: [
      {
        type: { type: String },
        school: { type: String },
        major: { type: String },
        year: { type: Number },
        isGraduated: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
