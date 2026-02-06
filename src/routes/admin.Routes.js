import express from "express";
import { getAllUsers, getAllComplaints } from "../controllers/adminController.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes
router.get("/users", auth, getAllUsers);
router.get("/complaints", auth, getAllComplaints);

export default router;