import Doctor_model from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const change_Avail = async(req,res)=>{
    try {
        const {docId} =req.body;
        const docData = await Doctor_model.findById(docId);
        await Doctor_model.findByIdAndUpdate(docId,{available : !docData.available});
        res.json({success:true,message:'Availability changed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const allDoctors = async (req,res)=>{
    try {
        const doctors = await Doctor_model.find({}).select(['-password','-email']);
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const doctor_login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const doctor = await Doctor_model.findOne({email});
        if(!doctor){
            return res.json({success:false,message:'Account Not Found'});
        }

        const isMatch = bcrypt.compare(password,doctor.password);
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env,SECRET_KEY);
            res.json({success:true,token});
        }
        else{
            return res.json({success:false,message:'Invalid Credentials'});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}