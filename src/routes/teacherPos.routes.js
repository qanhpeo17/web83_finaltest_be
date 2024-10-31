import { Router } from "express";
import teacherPosController from "../controller/teacherPos.controller.js";
const teacherPosRouter = Router();
teacherPosRouter.get("/", teacherPosController.getAllPos);
teacherPosRouter.post("/", teacherPosController.createPos);
export default teacherPosRouter;
