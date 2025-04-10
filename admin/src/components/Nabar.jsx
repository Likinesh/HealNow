/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { assets } from '../assets/assets'
import { Admincontext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
const Nabar = () => {
    const {Token,setToken,backendUrl} = useContext(Admincontext);
    const {dToken,setdToken} = useContext(DoctorContext);

    const navigate= useNavigate();
    const logout = async()=>{
        navigate('/');
        Token && setToken('');
        dToken && setdToken('');
        // Token && setToken('') && await axios.post(backendUrl+'api/admin/logout',{},{withCredentials:true});
        // dToken && setdToken('') && await axios.post(backendUrl+'api/doctor/logout',{},{withCredentials:true});
      
        Token && localStorage.removeItem('Token');
        dToken && localStorage.removeItem('dToken');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b bg-white border-white'>
        <div className='flex items-center gap-2 text-xs'>
            {/* Logo */}
            <img src={assets.admin_logo} className='w-36 sm:w-40 cursor-pointer' alt=''/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{Token ? 'Admin' : 'Doctor'}</p>
        </div>
        <button className='bg-[#5F6FFF] text-white text-sm px-6.5 py-2 rounded-full cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Nabar