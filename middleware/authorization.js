import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";
import { environmentConfig } from "../config/environmentConfig.js";

export const authenticateVerifier = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    sendResponse(res, false, 401, "You are not authenticated", null);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, environmentConfig.jwtSecret, (err, user) => {
    console.log("verifytoken----", user);
    if (err) {
      sendResponse(res, false, 403, "Token is not valid", null);
    }
    req.user = user;
    next();
  });
};
