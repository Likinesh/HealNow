import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from "./config/DBconnect.js";
import { connectCloudinary } from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import DoctorRouter from "./routes/DoctorRoute.js";
import userRoute from "./routes/userRoutes.js";

// app
const app = express();
const port = process.env.PORT || 3001;
connectDb();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());
app.options('*', cors()); // Preflight request handling


// api
app.use('/api/admin',adminRouter);
app.use('/api/doctor',DoctorRouter);
app.use('/api/user',userRoute);

app.listen(port,()=>{
    console.log(`Server at http://localhost/${port}`);
});