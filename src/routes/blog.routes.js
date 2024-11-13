import { Router } from "express";
import {
  createArtical,
  deleteArtical,
  getAllArticals,
  getArticalsById,
  getPageArticals,
  updateArtical,
  filterArticals,
  searchArticals,
} from "../controllers/index.js";
import { isAdminAndUserrArtical } from "../middleware/guard.middleware.js";

export const blogRouter = new Router();

blogRouter.get("/page", getPageArticals);
blogRouter.get("/filter", filterArticals);
blogRouter.get("/search", searchArticals);
blogRouter.get("/", getAllArticals);
blogRouter.get("/:id", getArticalsById);
blogRouter.post("/", createArtical);
blogRouter.put("/:id", isAdminAndUserrArtical, updateArtical);
blogRouter.delete("/:id", isAdminAndUserrArtical, deleteArtical);