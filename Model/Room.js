import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    available: { type: Boolean, default: true },
    description: { type: String },
    image: { type: String }, // store image URL
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
