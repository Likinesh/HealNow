/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Login from './pages/login'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast} from 'react-toastify';
import { Admincontext } from './context/AdminContext';
import Nabar from './components/Nabar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointment from './pages/Admin/Appointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
const App = () => {
  const {Token} = useContext(Admincontext);
  return Token ? 
  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Nabar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<Appointment />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
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