import express from "express";
import { sendComplaint } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/send", sendComplaint);

export default router;