import express from "express";
import {
  getGuests,
  addGuest,
  getGuestById,
  deleteGuest,
} from "../controllers/guestcontroller.js";

const router = express.Router();

router.get("/", getGuests);      // GET all guests
router.post("/", addGuest);      // ADD new guest
router.get("/:id", getGuestById); // GET one guest
router.delete("/:id", deleteGuest); // DELETE guest

export default router;
