import express from 'express'
import { GetProfile, LoginUser, registerUSer, UpdateProfile } from '../controller/userController.js';
import { UserAdmin } from '../middleware/authUser.js';
import { upload } from '../middleware/multer.js';

const userRoute = express.Router();

userRoute.post('/register',registerUSer);
userRoute.post('/login',LoginUser);
userRoute.get('/get-profile',UserAdmin,GetProfile);
userRoute.post('/update-profile',upload.single('image'),UserAdmin,UpdateProfile);

export default userRoute;