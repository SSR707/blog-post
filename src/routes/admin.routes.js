import express from "express";
import {
  getAllAdmin,
  gatPageAdmin,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
  createAdmin,
  filterAdmin,
  searchAdmin,
} from "../controllers/index.js";
export const adminRouter = express.Router();

adminRouter.get("/", getAllAdmin);
adminRouter.get("page", gatPageAdmin);
adminRouter.get("/filter", filterAdmin);
adminRouter.get("/search", searchAdmin);
adminRouter.get("/:id", getAdminByID);
//create Admin
adminRouter.post("/", createAdmin);

adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);
