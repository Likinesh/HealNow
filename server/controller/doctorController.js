import Doctor_model from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointment_Model from "../models/appointmentModel.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
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
        const user = await Doctor_model.findOne({email});
        if(!user){
            return res.json({success:false,message:'Account Not Found'});
        }

        const isMatch = bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY);
            res.json({success:true,token});
            // generateTokenAndSetCookie(res, user._id,"dtoken");
            // res.json({success:true});
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

// API to get dashboard data for doctor panel
export const doctor_dashboard = async (req, res) => {
    
    try {
        const {docId} = req.body
        const appointments = await appointment_Model.find({docId})

        let earnings = 0
        
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to get the doctor profile for doctor panel
export const doctorProfile = async (req,res) => {

    try {
        const {docId} = req.body
        const profileData = await Doctor_model.findById(docId).select('-password')

        res.json({success:true,profileData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to update doctor profile data
export const updateDoctorProfile = async (req,res) => {
    try {
        const {docId, fees, address, available} = req.body
        await Doctor_model.findByIdAndUpdate(docId, {fees, address, available})

        res.json({success:true, message:'Profile Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// export const logout = async (req, res) => {
// 	res.clearCookie("dtoken");
// 	res.json({ success: true, message: "Logged out successfully" });
// };