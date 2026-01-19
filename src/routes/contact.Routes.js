// backend/routes/contactRoutes.js
import express from "express";
import { sendMessage } from "../controllers/message.controller.js";

const contactrouter = express.Router();
contactrouter.post("/contact", sendMessage);

export default contactrouter;