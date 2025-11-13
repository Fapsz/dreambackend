import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomsRoutes from "./routes/roomsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import e from "express";
import cors from "cors";
import { config } from "dotenv";
config();
const app = e();
const port = process.env.PORT || 3004;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGODB_URL = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.error(" Mongodb connection failed", err);
  });
app.use(cookieParser());

// Health route
app.get("/api/health", (req, res) => {
  res.send("DreamHotel Backend is running 🚀");
});

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(e.static("./box"));

app.use(
  cors({
    origin: "https://my-project-seven-sage.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "box", "index.html"));
});
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomsRoutes);
app.use("/users", userRoutes);
// also accept singular /user so frontend that posts to /user/register works
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server is runninng on port : ${port}`);
  // console.log("server is running on port " + port)
});
