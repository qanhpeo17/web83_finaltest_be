import TeacherPosition from "../models/teacherPosition.models.js";

const getAllPos = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.status(200).json({ positions });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" + error.message });
  }
};
const createPos = async (req, res) => {
  const { name, code, des, isActive } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: "Name and code are required." });
  }

  try {
    const newPosition = new TeacherPosition({
      name,
      code,
      des,
      isActive,
    });

    const savedPosition = await newPosition.save();
    res.status(201).json({
      message: "Position created successfully",
      position: savedPosition,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const teacherPosController = {
  getAllPos,
  createPos,
};
export default teacherPosController;
