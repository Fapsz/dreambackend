
import User from "../Model/User.js";
import Room from "../Model/Room.js";
import Booking from "../Model/Booking.js";
import Guest from "../Model/Guest.js";

// Get dashboard summary
 const getDashboardSummary = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const roomCount = await Room.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const guestCount = await Guest.countDocuments();
    res.json({
      success: true,
      data: {
        users: userCount,
        rooms: roomCount,
        bookings: bookingCount,
        guests: guestCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all users
 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all bookings
 const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room").populate("guest");
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all rooms
 const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all guests
 const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json({ success: true, guests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getDashboardSummary, getAllUsers, getAllBookings, getAllRooms, getAllGuests };