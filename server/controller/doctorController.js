import Doctor_model from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointment_Model from "../models/appointmentModel.js";
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
            const token = jwt.sign({id:doctor._id},process.env.SECRET_KEY);
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

export const doctor_appointments = async(req,res)=>{
    try {
        const docId = req.body;
        const appointments = await appointment_Model.find({docId});
        res.json({success:true,appointments});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const appointment_complete = async(req,res) =>{
    try {
        const {docId,appointmentId} = req.body;
        const appointment_data = await appointment_Model.findById(appointmentId);
        
        if(appointment_data &&  appointment_data.docId === docId){
            await appointment_Model.findByIdAndUpdate(appointmentId,{isCompleted:true});
            res.json({success:true,message:'Appointment Completed'})
        }
        else{
            return res.json({success:false,message:'Failed Marking.Please Refresh'});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const appointment_cancel = async(req,res) =>{
    try {
        const {docId,appointmentId} = req.body;
        const appointment_data = await appointment_Model.findById(appointmentId);
        
        if(appointment_data &&  appointment_data.docId === docId){
            await appointment_Model.findByIdAndUpdate(appointmentId,{cancelled:true});
            res.json({success:true,message:'Appointment Cancelled'})
        }
        else{
            return res.json({success:false,message:'Failed Marking.Please Refresh'});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}