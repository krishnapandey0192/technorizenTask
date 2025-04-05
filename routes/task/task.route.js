import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../../controller/task/task.controller.js";

import { authenticateVerifier } from "../../middleware/authorization.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.post("/task", authenticateVerifier, isAdmin, createTask);
router.get("/task", authenticateVerifier, getAllTasks);
router.get("/task/:id", authenticateVerifier, getTaskById);
router.put("/task/:id", authenticateVerifier, isAdmin, updateTask);
router.delete("/task/:id", authenticateVerifier, isAdmin, deleteTask);

export default router;
