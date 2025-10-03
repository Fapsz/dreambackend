// routes/contactRoutes.js
import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/contactcontroller.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// Public: Guest can send a message
router.post("/", createMessage);

// Admin: View all messages
router.get("/", authorize(["Admin"]), getMessages);

// Admin: Delete a message
router.delete("/:id", authorize(["Admin"]), deleteMessage);

export default router;
