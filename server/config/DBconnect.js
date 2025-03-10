import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Connected To DB'))
    .catch((e)=>console.error(e));
}