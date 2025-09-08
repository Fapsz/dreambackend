import express from "express";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/roomcontroller.js";
import { upload } from "../config/cloudinary.config.js"; // multer-cloudinary setup

const router = express.Router();

router.post("/", upload.array("images", 5), createRoom);
router.get("/", getRooms);
router.get("/:id", getRoomById);
router.put("/:id", upload.array("images", 5), updateRoom);
router.delete("/:id", deleteRoom);

export default router;
