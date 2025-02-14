import express from 'express'
import { allDoctors } from '../controller/doctorController.js';

const DoctorRouter =express.Router();

DoctorRouter.get('/all-list',allDoctors);

export default DoctorRouter