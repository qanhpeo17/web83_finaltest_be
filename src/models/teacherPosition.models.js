import mongoose from "mongoose";

const TeacherPositionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    des: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TeacherPosition = mongoose.model(
  "TeacherPosition",
  TeacherPositionSchema
);

export default TeacherPosition;
