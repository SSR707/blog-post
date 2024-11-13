import jwt from "jsonwebtoken";
import { User, OTP } from "../model/index.js";
import {
    accessTokenSing,
    hashPassword,
    otpGenerator,
    refreshTokenSing,
    sendMail,
  } from "../helpers/index.js";

export const registerService = async (data) => {
    try{ 
        const { email, role } = data;
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
          const otp = otpGenerator();
          sendMail(
            email,
            "OTP",
            "OTP CODE",
            `<h1>
            This Your otp: 
            <h2 style="background: yellow;color: rgb(0, 0, 0);width: 7%;">${otp}</h2>
            </h1>`
          );
          const user = new User(data);
          await user.save();
          const db_otp = new OTP({
            user_id: user._id,
            otp_code: otp,
          });
          await db_otp.save();
          return  true;
        }
        return  false;
    }catch(error){
        throw error
    }
}


export const loginService = async(data) => {
    try{

    }catch(error){
        
    }
}