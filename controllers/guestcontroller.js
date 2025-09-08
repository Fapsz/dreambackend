import Guest from "../models/guestModel.js";

// ✅ Get all guests
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guests", error });
  }
};

// ✅ Add new guest
export const addGuest = async (req, res) => {
  try {
    const { name, email, roomType, checkIn, checkOut } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email required" });
    }

    const newGuest = new Guest({ name, email, roomType, checkIn, checkOut });
    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(500).json({ message: "Error adding guest", error });
  }
};

// ✅ Get single guest
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guest", error });
  }
};

// ✅ Delete guest
export const deleteGuest = async (req, res) => {
  try {
    const deleted = await Guest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Guest not found" });
    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting guest", error });
  }
};
export default { getGuests, addGuest, getGuestById, deleteGuest };