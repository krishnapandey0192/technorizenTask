import { environmentConfig } from "../config/environmentConfig.js";
import userModel from "../model/user/user.model.js";
import bcrypt from "bcryptjs";

export const initialiseDefaultAdmin = async () => {
  try {
    const adminEmail = environmentConfig.adminEmail;
    const adminPassword = environmentConfig.adminPassword;

    const existAdmin = await userModel.findOne({ email: adminEmail });

    if (!existAdmin) {
      const hsashedPassword = await bcrypt.hash(adminPassword, 10);
      await userModel.create({
        name: "admin",
        email: adminEmail,
        password: hsashedPassword,
        role: "admin",
      });
      console.log("Default admin created");
    } else {
      console.log("Admin is already exist");
    }
  } catch (error) {
    console.error("Error initialising admin : ", error);
  }
};
