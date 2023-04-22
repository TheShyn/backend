import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import dotenv from 'dotenv'

dotenv.config()
export const checkPermission = async (req, res, next) => {
    try {
      const {SECRET_CODE} = process.env
      
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
      console.log(token, req.headers.authorization)
      // check token tồn tại hay không 
      if(!token){
        return res.status(403).send({
          message:"You do not have permission to access"
        })
      }
      // xác thực jwt token
      jwt.verify(token, SECRET_CODE, async (err, payload) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(400).json({
              message: err.message || "JWT het han!",
            });
          }
  
          if (err.name === "JsonWebTokenError") {
            return res.status(400).json({
              message: err.message || "JWT khong dung!",
            });
          }
        }
        
        const user = await User.findById(payload._id);
        console.log(user)
        if (user.role != "admin") {
          return res.status(403).send({
            message:"You do not have permission to access"
          })
        }
        req.user = user;
        next();
      });
      // // kiểm tra xem user có quyền admin không
      // // lưu thông tin user vào request để sử dụng cho các middleware khác
  
    } catch (error) {
      res.status(401).json({ message: error });
    }
  };