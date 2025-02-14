import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import Doctor_model from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
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
            const token = jwt.sign(email+password,process.env.SECRET_KEY,{expiresIn:'1h'});
            res.json({success:true,token});
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