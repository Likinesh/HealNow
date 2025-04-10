import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import Doctor_model from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import User_Model from '../models/userModel.js';
import appointment_Model from '../models/appointmentModel.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
export const doctorRegister = async(req,res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const img = req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:'Fill all the details'});
        }

        // check for email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter a valid email'});
        }
        
        // check password
        if(password.length<8){
            return res.json({success:false,message:'Enter a strong password'});
        }

        // Salt and hash pwd
        const salt = await bcrypt.genSalt(10);
        const hash_pwd = await bcrypt.hash(password,salt);

        // upload image to cloudinary
        const imgUpload = await cloudinary.uploader.upload(img.path,{resource_type:"image"});
        const imgURL = imgUpload.secure_url;

        const data = {
            name,
            email,
            password:hash_pwd,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image:imgURL,
            date:Date.now()
        };

        const newDoctor = new Doctor_model(data);
        await newDoctor.save();
        res.json({success:true,message:'Doctor Added'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const loginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PWD){
            const token = jwt.sign(email+password,process.env.SECRET_KEY);
            // generateTokenAndSetCookie(res,email,"token");
            // res.json({success:true});
        }
        else{
            res.json({success:false,message:"Invalid Credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const alldoctors = async(req,res)=>{
    try {
        const doctors = await Doctor_model.find({}).select('-password');
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const admin_dashboard = async(req,res)=>{
    try {
        const doctors = await Doctor_model.find({});
        const users = await User_Model.find({});
        const appointment = await appointment_Model.find({});
        const data = {
            doctors:doctors.length,
            patients:users.length,
            appointment:appointment.length,
            latestAppointment:appointment.reverse().slice(0,5)
        }
        res.json({success:true,data});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const appointment_Admin = async(req,res)=> {
    try {
        const appointment = await appointment_Model.find({});
        res.json({success:true,data:appointment});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export const cancelAppointment = async(req,res) =>{
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointment_Model.findById(appointmentId);
        
        await appointment_Model.findByIdAndUpdate(appointmentId, {
          cancelled: true,
        })
    
        const { docId, slotDate, slotTime } = appointmentData;
    
        const docData = await Doctor_model.findById(docId);
        let slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await Doctor_model.findByIdAndUpdate(docId, {
          slots_booked
        })
    
        res.json({ success: true, message: 'Appointment Cancelled' });
    
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

// export const logout = async (req, res) => {
// 	res.clearCookie("token");
// 	res.json({ success: true, message: "Logged out successfully" });
// };