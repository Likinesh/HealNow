import express from 'express'
import { admin_dashboard, alldoctors, doctorRegister, loginAdmin } from '../controller/adminController.js';
import { upload } from '../middleware/multer.js';
import { authAdmin } from '../middleware/authAdmin.js';
import { change_Avail } from '../controller/doctorController.js';

const adminRouter = express.Router();

// To process image to add data we use multer
adminRouter.post('/login',loginAdmin);
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),doctorRegister);
adminRouter.post('/all-doctors',authAdmin,alldoctors);
adminRouter.post('/change-avail',authAdmin,change_Avail);
adminRouter.get('/dashboard',authAdmin,admin_dashboard);

export default adminRouter