/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast} from 'react-toastify';
import { Admincontext } from './context/AdminContext';
import Nabar from './components/Nabar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import D_Dashboard from './pages/Doctor/Dashboard';
import Appointment from './pages/Admin/Appointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Img from './assets/1.jpeg';

const App = () => {
  const {Token} = useContext(Admincontext);
  const {dToken} = useContext(DoctorContext);
  return Token || dToken ? 
  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Nabar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<>
            <img src={Img} alt='WELCOME'/>
          </>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<Appointment />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/add-doctor' element={<AddDoctor />} />

          <Route path='/doctor-dashboard' element={<D_Dashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />

        </Routes>
      </div>
    </div>
  )
  :
  (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App