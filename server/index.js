import express from "express"
import cors from 'cors'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDb  from "./config/DBconnect.js";
import { connectCloudinary } from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import DoctorRouter from "./routes/DoctorRoute.js";
import userRoute from "./routes/userRoutes.js";

// app
const app = express();
app.use(cookieParser())
const port = process.env.PORT || 3001;
connectDb();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));
app.options('*', cors()); // Preflight request handling

// api
app.get('/',(req,res)=>{
    res.send("Home for server");
})
app.use('/api/admin',adminRouter);
app.use('/api/doctor',DoctorRouter);
app.use('/api/user',userRoute);

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
});