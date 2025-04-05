import userModel from "../../model/user/user.model.js";
import { sendResponse } from "../../utils/sendResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { environmentConfig } from "../../config/environmentConfig.js";

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, false, 400, "All feilds are requred", null);
    }

    // check user already exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return sendResponse(res, false, 400, "Email is already taken", null);
    }

    // const hsashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password,
    });
    newUser.password = undefined;

    // generate jwt token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      environmentConfig.jwtSecret,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      isSuccess: true,
      message: "User Created Successfully",
      user: newUser,
      accessToken: token,
    });

    // sendResponse(res, true, 200, "User Create Successfully", newUser);
  } catch (error) {
    console.log("signup error---", error);
    return sendResponse(res, false, 500, "Internal Server Error", null);
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return sendResponse(res, false, 400, "User does not exist", null);
    }
    const comparePassword = bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return sendResponse(res, false, 400, "Invalid email or password", null);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      environmentConfig.jwtSecret,
      { expiresIn: "1d" }
    );

    user.password = undefined;
    return res.status(200).json({
      isSuccess: true,
      message: "User logged in successfully",
      user: user,
      accessToken: token,
    });
  } catch (error) {
    return sendResponse(res, false, 500, "Internal Server Error", null);
  }
};

export const getAllEmployee = async(req,res)=>{
  try {
  const employees = await userModel.find({ role: "employee" }).select("-password");
  if(!employees){
   return sendResponse(res,false,403,"Employee not found",null)
  }
  return sendResponse(res,true,200,"Employee fetch successfully",employees)
    
  } catch (error) {
 return   sendResponse(res,false,500,"Internal Server Error",null)
  }
} 
