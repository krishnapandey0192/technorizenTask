import express from "express";
import {
  userSignIn,
  userSignUp,
  getAllEmployee
} from "../../controller/user/user.controller.js";
import { authenticateVerifier } from "../../middleware/authorization.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userSignIn);
router.get("/employee",authenticateVerifier,isAdmin, getAllEmployee)

export default router;
