import Teacher from "../models/teacher.models.js";
import User from "../models/user.models.js";
import crypto from "crypto";
const getAllTeacher = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const teachers = await Teacher.find()
      .populate({
        path: "userId",
        select: "name email phoneNumber address isActive",
      })
      .populate({
        path: "teacherPositionsId",
        select: "name",
      })
      .skip(skip)
      .limit(limit);

    const teacherList = teachers.map((teacher) => ({
      code: teacher.code,
      name: teacher.userId.name,
      email: teacher.userId.email,
      phoneNumber: teacher.userId.phoneNumber,
      isActive: teacher.isActive,
      address: teacher.userId.address,
      position: teacher.teacherPositionsId.map((position) => position.name),
      degrees: teacher.degrees.map((degree) => ({
        type: degree.type,
        school: degree.school,
      })),
    }));
    const totalTeachers = await Teacher.countDocuments();
    const totalPages = Math.ceil(totalTeachers / limit);
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalTeachers: totalTeachers,
      teachers: teacherList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi server " + error.message,
    });
  }
};
const genRandomCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = crypto.randomInt(100000, 999999).toString();
    const existingTeacher = await Teacher.findOne({ code });
    if (!existingTeacher) isUnique = true;
  }
  return code;
};
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      dob,
      degrees,
      teacherPositionsId,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const user = new User({
      name,
      email,
      phoneNumber,
      address,
      dob,
      role: "TEACHER",
    });
    await user.save();

    const code = await genRandomCode();

    const teacher = new Teacher({
      userId: user._id,
      code,
      teacherPositionsId,
      degrees,
    });
    await teacher.save();

    res.status(201).json({ message: "Tạo giáo viên thành công", teacher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" + error.message });
  }
};
const teacherController = { getAllTeacher, createTeacher };
export default teacherController;
