import { Router } from "express";
import {
  deleteUser,
  filterUser,
  getAllUser,
  getPageUsers,
  getUserById,
  searchUser,
  updateUser,
  userProfileCon,
} from "../controllers/index.js";
import {
  isAdmin,
  isAdminAndUser,
  isSupperAdminAndUser,
} from "../middleware/index.js";

export const userRouter = new Router();

userRouter.post("/profile", userProfileCon);
userRouter.get("/page", isAdmin, getPageUsers);
userRouter.get("/filter", isAdmin, filterUser);
userRouter.get("/search", isAdmin, searchUser);
userRouter.get("/", isAdmin, getAllUser);
userRouter.get("/:id", isAdminAndUser, getUserById);
userRouter.put("/:id", isAdminAndUser, updateUser);
userRouter.delete("/:id", isSupperAdminAndUser, deleteUser);
