import { Router } from "express";
import {
  createCourses,
  deleteCourses,
  filterCourses,
  getAllCourses,
  getCoursesById,
  getPageCourses,
  searchCourses,
  updateCourses,
} from "../controllers/index.js";
import { isAdmin, isSupperAdmin } from "../middleware/guard.middleware.js";

export const coursesRouter = new Router();

coursesRouter.get("/page", getPageCourses);
coursesRouter.get("/filter", filterCourses);
coursesRouter.get("/search", searchCourses);
coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.post("/", isAdmin, createCourses);
coursesRouter.put("/:id", isAdmin, updateCourses);
coursesRouter.delete("/:id", isSupperAdmin, deleteCourses);