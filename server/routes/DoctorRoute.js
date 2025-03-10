import express from 'express'
import { allDoctors, doctor_login } from '../controller/doctorController.js';

const DoctorRouter =express.Router();

DoctorRouter.get('/all-list',allDoctors);
DoctorRouter.post('/login',doctor_login);

export default DoctorRouter