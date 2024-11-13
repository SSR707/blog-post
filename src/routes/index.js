import { Router } from "express";
import { authGuard, isSupperAdmin } from "../middleware/index.js";
import { authRouter } from "./auth.routes.js";
import {blogRouter} from './blog.routes.js'
import {userRouter} from './user.routes.js'
import { categoryRouter } from "./category.routes.js";
import { commentRouter } from "./comment.routes.js";
import { coursesRouter } from "./courses.routes.js";
import { adminRouter } from "./admin.routes.js";
export const router = new Router();

router.use("/auth", authRouter);
router.use("/blog", authGuard ,blogRouter);
router.use("/users", authGuard ,userRouter);
router.use("/category", authGuard ,categoryRouter);
router.use("/comment", authGuard ,commentRouter);
router.use("/courses", authGuard ,coursesRouter);
//admin yaratish faqat supperAdminga huquqi bor
router.use("/admin", authGuard , isSupperAdmin ,adminRouter);

