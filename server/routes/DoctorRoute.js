import express from 'express'
import { allDoctors, appointment_cancel, appointment_complete, doctor_appointments, doctor_login } from '../controller/doctorController.js';
import { authDoc } from '../middleware/authDoc.js';

const DoctorRouter =express.Router();

DoctorRouter.get('/all-list',allDoctors);
DoctorRouter.post('/login',doctor_login);
DoctorRouter.get('/appointments',authDoc,doctor_appointments);
DoctorRouter.post('/complete',authDoc,appointment_complete);
DoctorRouter.post('/cancel',authDoc,appointment_cancel)

export default DoctorRouter