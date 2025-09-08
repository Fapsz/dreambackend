import Room from "../Model/Room.js";

// @desc Create new room
export const createRoom = async (req, res) => {
  try {
    const { title, description, price, roomType } = req.body;

    // If using multer + cloudinary, images come from req.files
    const images = req.files ? req.files.map((file) => file.path) : [];

    const room = new Room({
      title,
      description,
      price,
      roomType,
      images,
    });

    await room.save();
    res.status(201).json({ success: true, message: "Room created", room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Get single room
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Update room
export const updateRoom = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.images = req.files.map((file) => file.path);
    }

    const room = await Room.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, message: "Room updated", room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Delete room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export default { createRoom, getRooms, getRoomById, updateRoom, deleteRoom };
