import express from "express";
import { sendComplaint, getUserComplaintSummary } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/send", sendComplaint);
router.get("/summary/:userId", getUserComplaintSummary);

export default router;