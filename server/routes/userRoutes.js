import express from 'express'                                                                              //paymentRazorpay, verifyRazorpay
import { BookAppointment, cancelAppointment, GetProfile, LoginUser, logout, registerUSer, UpdateProfile, UserBooking} from '../controller/userController.js';
import { UserAdmin } from '../middleware/authUser.js';
import { upload } from '../middleware/multer.js';

const userRoute = express.Router();

userRoute.post('/register',registerUSer);
userRoute.post('/login',LoginUser);
userRoute.get('/get-profile',UserAdmin,GetProfile);
userRoute.post('/update-profile',upload.single('image'),UserAdmin,UpdateProfile);
userRoute.post('/book-appointment',UserAdmin,BookAppointment);
userRoute.get('/appointments',UserAdmin,UserBooking);
userRoute.post('/cancel-appointment',cancelAppointment);
userRoute.post('/logout',logout);
// userRoute.post('/payment-razorpay',authUser,paymentRazorpay)
// userRoute.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRoute;