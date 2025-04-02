import express from "express";
import {
  userSignIn,
  userSignUp,
} from "../../controller/user/user.controller.js";

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userSignIn);

export default router;
