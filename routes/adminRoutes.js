// routes/adminRoutes.js
import express from "express";
import {
  getDashboardSummary,
  getAllUsers,
  getAllBookings,
  getAllRooms,
  getAllGuests,
} from "../controllers/admincontroller.js";

const router = express.Router();

// Dashboard summary
router.get("/dashboard", getDashboardSummary);

// Users
router.get("/users", getAllUsers);

// Bookings
router.get("/bookings", getAllBookings);

// Rooms
router.get("/rooms", getAllRooms);

// Guests
router.get("/guests", getAllGuests);

export default router;
