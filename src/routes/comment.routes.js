import { Router } from "express";
import {
  createComment,
  deleteComment,
  filterComment,
  getAllComment,
  getCommentById,
  getPageComment,
  searchComment,
  updateComment,
} from "../controllers/index.js";
import { isAdminAndUserrComment } from "../middleware/guard.middleware.js";

export const commentRouter = new Router();

commentRouter.get("/page", getPageComment);
commentRouter.get("/filter", filterComment);
commentRouter.get("/search", searchComment);
commentRouter.get("/", getAllComment);
commentRouter.get("/:id", getCommentById);
commentRouter.post("/", createComment);
commentRouter.put("/:id", isAdminAndUserrComment, updateComment);
commentRouter.delete("/:id", isAdminAndUserrComment, deleteComment);