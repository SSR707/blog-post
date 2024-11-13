import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  filterCategory,
  getAllCategory,
  getCategoryById,
  getPageCategory,
  searchCategory,
  updateCategory,
} from "../controllers/index.js";
import { isAdmin, isSupperAdmin } from "../middleware/guard.middleware.js";

export const categoryRouter = new Router();

categoryRouter.get("/page", getPageCategory);
categoryRouter.get("/filter", filterCategory);
categoryRouter.get("/search", searchCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", isAdmin, createCategory);
categoryRouter.put("/:id", isAdmin, updateCategory);
categoryRouter.delete("/:id", isSupperAdmin, deleteCategory);