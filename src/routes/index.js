import { Router } from "express";
import teacherRouter from "./teacher.routes.js";
import teacherPosRouter from "./teacherPos.routes.js";
const router = Router();

router.use("/teachers", teacherRouter);
router.use("/teacher-positions", teacherPosRouter);

export default router;
