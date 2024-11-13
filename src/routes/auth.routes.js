import { Router } from "express";
import {
  loginController,
  refreshTokenController,
  registerController,
  verifyController,
  otpCodePassController,
  forgetPassword
} from "../controllers/index.js";
import { authGuard } from "../middleware/index.js";

export const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refreshToken", refreshTokenController);
authRouter.post("/verifyToken", verifyController);
//otpCodePassController generate bolgan otp ni kiritb pass ozgartiriladi
authRouter.post("/forgerPassword" ,authGuard, forgetPassword)
//Pasword ozgartish uchun otp code yuborish
authRouter.get("/creteOtpCodePassword" ,authGuard, otpCodePassController)