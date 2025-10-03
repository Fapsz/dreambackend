// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullname: { type: String, required: true }, // Guest name
  email: { type: String, required: true }, // Guest email
  phone: { type: String }, // Optional phone number
  subject: { type: String, required: true }, // Subject of the message
  message: { type: String, required: true }, // Full message
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Contact", contactSchema);
