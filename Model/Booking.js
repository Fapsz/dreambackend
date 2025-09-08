import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    roomType: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
  
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Checked-in", "Checked-out"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
