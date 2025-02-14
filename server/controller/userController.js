import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import User_Model from "../models/userModel.js";

//User register

export const registerUSer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Fill all the details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // check password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Salt and hash pwd
    const salt = await bcrypt.genSalt(10);
    const hash_pwd = await bcrypt.hash(password, salt);

    const data = {
      name,
      email,
      password: hash_pwd,
    };
    const new_user = new User_Model(data);
    const user = await new_user.save();

    const utoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    return res.json({ success: true, utoken });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User_Model.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (isMatch) {
      const utoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return res.json({ success: true, utoken });
    } else {
      return res.json({ success: false, message: "Wrong Password" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const GetProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User_Model.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if(!name || !phone || !address || !dob || !gender){
        return res.json({success:false,message:"Data Missing"});
    }
    await User_Model.findByIdAndUpdate(userId,{
        name,phone,address:JSON.parse(address),dob,gender
    })
    if(imageFile){
        const imgUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imgURL = imgUpload.secure_url
        await User_Model.findByIdAndUpdate(userId,{image:imgURL});
    }
    res.json({success:true,message:'Profile Updated'});

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
