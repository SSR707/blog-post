import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const accessTokenSing = (payload) =>{
    return jwt.sign(payload, process.env.accessSECRETkey, {
    expiresIn: process.env.accessTIME,
  });
}
export const refreshTokenSing = (payload) =>{
    return jwt.sign(payload, process.env.refreshSECRETkey, {
    expiresIn: process.env.refreshTIME,
    });
}