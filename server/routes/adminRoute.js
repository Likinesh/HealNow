import express from 'express'
import { doctorRegister, loginAdmin } from '../controller/adminController.js';
import { upload } from '../middleware/multer.js';
import { authAdmin } from '../middleware/authAdmin.js';

const adminRouter = express.Router();

// To process image to add data we use multer
adminRouter.post('/login',loginAdmin);
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),doctorRegister);

export default adminRouter