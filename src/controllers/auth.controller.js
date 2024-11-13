import jwt from "jsonwebtoken";
import { User, OTP } from "../model/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import {
  registerValidation,
  loginValidation,
  forgetPassValidation,
  verifyValidation,
} from "../schema/index.js";
import {
  accessTokenSing,
  hashPassword,
  otpGenerator,
  refreshTokenSing,
  sendMail,
} from "../helpers/index.js";
import {registerService} from '../service/index.js'

export const registerController = async (req, res, next) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    if (req.body.role === "admin") {
      return res.status(statusCodes.FORBIDDEN).send({
        message: "Adminni faqatgina SupperAdmin yarata oladi!",
      });
    }
    const data = registerService(req.body)
    if(data){
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    next(new ApiError(error.statusCode, error.messages));
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { error, value } = loginValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }
    if (currentUser.is_active === false) {
      return res.status(statusCodes.FORBIDDEN).send({
        status: "Siz active User emasiz",
      });
    }
    const passwordIsEqual = await currentUser.compare(password);
    if (!passwordIsEqual) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send(errorMessages.INVALID_CREDENTIALS);
    }
    const payload = {
      id: currentUser._id,
      sub: email,
      role: currentUser.role,
    };
    const accessToken = accessTokenSing(payload);
    const refreshToken = refreshTokenSing(payload);
    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.refreshSECRETkey, (error, decode) => {
      if (error)
        throw new Error(statusCodes.FORBIDDEN, errorMessages.FORBIDDEN);

      logger.info({ decode });

      const accessToken = jwt.sign(
        {
          sub: decode.sub,
          role: decode.role,
        },
        process.env.accessSECRETkey,
        {
          expiresIn: process.env.accessTIME,
        }
      );

      return res.send({ accessToken, refreshToken: token });
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const verifyController = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const { error, value } = verifyValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const currentUser = await User.findOne({ email });
    const currentOTP = await OTP.findOne({ user_id: currentUser._id });

    if (new Date() > currentOTP.expires_at) {
      await OTP.deleteOne({ user_id: currentUser._id });
      return res.status(statusCodes.BAD_REQUEST).send({
        msg: "OTP CODE NI VOHTI TUGAGAN YANGI KOD OLING",
      });
    }
    const isEqual = currentOTP.verify(otp);
    console.log(isEqual)
    if (!isEqual) {
      return res.status(statusCodes.UNAUTHORIZED).send({
        msg: "OTP KOD HATO KIRITILGAN",
      });
    }
    await OTP.deleteOne({ user_id: currentUser._id });
    await User.updateOne({ email }, { is_active: true });
    return res.status(statusCodes.OK).send({
      satatus: "User is actived",
    });
  } catch (error) {
    next(new ApiError(error.messages));
  }
};

export const otpCodePassController = async (req, res, next) => {
  try {
    const otp = otpGenerator();

    sendMail(
      req.user.sub,
      "OTP",
      "OTP CODE",
      `<h1>
      This Your otp: 
      <h2 style="background: yellow;color: rgb(0, 0, 0);">${otp}</h2>
      </h1>`
    );
    const db_otp = new OTP({
      user_id: req.user.id,
      otp_code: otp,
    });
    await db_otp.save();
    return res.status(statusCodes.CREATED).send("Otp Code Email ga yuborildi");
  } catch (error) {
    next(new ApiError(error.messages));
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { otp, new_password } = req.body;
    const { error, value } = forgetPassValidation(req.body);
    if (error) {
      return res.status(statusCodes.BAD_REQUEST).send({
        errorMsg: error.details[0].message,
      });
    }
    const user = await User.findOne({ _id: req.user.id });
    const currentOTP = await OTP.findOne({ user_id: req.user.id });
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.USER_NOT_FOUND,
      });
    }
    if (!currentOTP) {
      return res.status(statusCodes.NOT_FOUND).send({
        status: errorMessages.NOT_FOUND,
        msg: "otpCodePassController otp ccode olishingiz kerak!",
      });
    }
    if (new Date() > currentOTP.expires_at) {
      await OTP.deleteOne({ user_id: currentUser._id });
      return res.status(statusCodes.BAD_REQUEST).send({
        msg: "OTP CODE NI VOHTI TUGAGAN YANGI KOD OLING",
      });
    }
    const isEqual = currentOTP.verify(otp);
    if (!isEqual) {
      return res.status(statusCodes.UNAUTHORIZED).send({
        msg: "OTP KOD HATO KIRITILGAN",
      });
    }
    const hashPass = await hashPassword(new_password);
    console.log(hashPass)
    await OTP.deleteOne({ user_id: user._id });
    await User.updateOne({ _id: req.user.id }, { password: hashPass });
    return res.status(statusCodes.OK).send({
      satatus: "Success",
      msg: "Parol Mofiyaqatli ozgardi",
    });
  } catch (error) {
    console.log(error)
    next(new ApiError(error.messages));
  }
};
