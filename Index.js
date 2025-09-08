import path from 'path';
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import bookingRoutes from './routes/bookingRoutes.js'
import roomsRoutes from './routes/roomsRoutes.js'

import e from "express";
import cors from 'cors';
import { config } from "dotenv";
config()
const app = e();
const port = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGODB_URL = process.env.MONGODB_URI 


mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((err) => {
        console.error(" Mongodb connection failed", err);
    });
app.use(cookieParser());


app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("DreamHotel Backend is running 🚀");
});

app.use(e.json());
app.use(e.urlencoded({extended:true}))

app.use(e.static('./box'))

app.use(cors({
    origin: ['http://localhost:5173' ,"https://DREAMBACKEND-react-xi.vercel.app"],
    credentials: true,
}));        

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'box','index.html'))
})
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomsRoutes);


app.listen(port,()=>{
    console.log(`server is runninng on port : ${port}`)
    // console.log("server is running on port " + port)
})


