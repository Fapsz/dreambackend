import Booking from "../Model/Booking.js";

// @desc Create new booking
export const createBooking = async (req, res) => {
  try {
    const { guestName, email, roomType, checkIn, checkOut } = req.body;

    const booking = new Booking({
      guestName,
      email,
      roomType,
      checkIn,
      checkOut,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Get single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Update booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
