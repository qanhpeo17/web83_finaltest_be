import { Router } from "express";
import teacherController from "../controller/teacher.controller.js";
const teacherRouter = Router();

teacherRouter.get("/", teacherController.getAllTeacher);
teacherRouter.post("/", teacherController.createTeacher);
export default teacherRouter;
