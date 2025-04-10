import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import User_Model from "../models/userModel.js";
import Doctor_model from "../models/doctorModel.js";
import appointment_Model from "../models/appointmentModel.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
// import razorpay from 'razorpay';
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
    // generateTokenAndSetCookie(res, user._id,"utoken");
    // return res.json({ success: true });
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const utoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return res.json({ success: true, utoken });
      // generateTokenAndSetCookie(res, user._id,"utoken");
      // return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Wrong Password" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// export const logout = async (req, res) => {
// 	res.clearCookie("utoken");
// 	res.json({ success: true, message: "Logged out successfully" });
// };

export const GetProfile = async (req, res) => {
  try {
    const { userId } = req.body;
     const userData = await User_Model.findById(userId).select("-password");
    // const { user } = req;
    // const userData = await User_Model.findById(user.userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const {user} = req;
    userId=user.userId;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await User_Model.findByIdAndUpdate(userId, {
      name, phone, address: JSON.parse(address), dob, gender
    })
    if (imageFile) {
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imgURL = imgUpload.secure_url
      await User_Model.findByIdAndUpdate(userId, { image: imgURL });
    }
    res.json({ success: true, message: 'Profile Updated' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


export const BookAppointment = async (req, res) => {
  try {
    const { userId,docId, slotDate, slotTime } = req.body;
    // const {user} = req;
    const docData = await Doctor_model.findById(docId).select('-password');
    console.log(user.userId);
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor Not Available' });
    }

    let slots_booked = docData.slots_booked;
    //check slot
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot Not Available' });
      }
      else {
        slots_booked[slotDate].push(slotTime);
      }
    }
    else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    // const id=user.userId
    const id = userId
    const userData = await User_Model.findById(user.userId).select('-password');
    delete docData.slots_booked;
    const appointment_data = {
      userId:id,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }
    const newAppointment = new appointment_Model(appointment_data);
    await newAppointment.save();

    await Doctor_model.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

export const UserBooking = async (req, res) => {
  try {
    const { userId } = req.body;
     const appointments = await appointment_Model.find({ userId });
    // const { user } = req;
    // const appointments = await appointment_Model.find({ userId:user.userId });
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const { userId,appointmentId } = req.body;
    const appointmentData = await appointment_Model.findById(appointmentId);
    // console.log(appointmentData)
    if (appointmentData.userId != userId) {
      return res.json({ success: false, message: 'Unauthorized access' });
    }
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

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// // API to make payment of appoinntment using raazorpay
// export const paymentRazorpay = async (req, res) => {

//   try {
//     const { appointmentId } = req.body
//     const appointmentData = await appointment_Model.findById(appointmentId)

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({ success: false, message: 'Appointment not found or cancelled' })
//     }

//     // creating options for razorpay payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId
//     }

//     const order = await razorpayInstance.orders.create(options)

//     res.json({ success: true, order })
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }

// }

// // API to verify payment of razorpay
// export const verifyRazorpay = async (req,res) =>{
//   try {
//     const {razorpay_order_id} = req.body
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//     if(orderInfo.status == 'paid'){
//       await appointment_Model.findByIdAndUpdate(orderInfo.receipt,{payment:true})
//       res.json({success:true,message:"Payment Successful"})
//     }else{
//       res.json({success:false,message:"Payment Failed"})
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// }