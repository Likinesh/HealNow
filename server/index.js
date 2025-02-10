import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from "./config/DBconnect";
import { connectCloudinary } from "./config/cloudinary";

// app
const app = express();
const port = process.env.PORT || 3000;
connectDb();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api
app.get('/',(req,res)=>{

});

app.listen(port,()=>{
    console.log(`Server at http://localhost/${port}`);
});