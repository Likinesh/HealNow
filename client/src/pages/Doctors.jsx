/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import {AppContext} from '../context/AppContext'
import { types } from '../constants';
const Doctors = () => {
  const {speciality} = useParams();
  // console.log(speciality);
  const [filter,set_filter]=useState([]);
  const navigate = useNavigate()
  const {doctors} = useContext(AppContext);

  const applyFilter = ()=>{
    if(speciality){
      set_filter(doctors.filter(doc => doc.speciality===speciality))
    }
    else{
      set_filter(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])

  return (
    <div>
        <p className='text-gray-600'>Browser Through Doctors specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <div className=' flex flex-col gap-4 text-sm text-gray-600'>
            {
              types.map((item,index)=>(
                <p onClick={()=>speciality===item?navigate('/doctors'):navigate(`/doctors/${item}`)} key={index} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality===item?'bg-indigo-100 text-black':''}`}>{item}</p>
              ))
            }
          </div>
          <div className='w-full grid grid-cols-3 { grid-template-columns: repeat(5, minmax(0, 1fr)); } gap-4 gap-y-6'>
            {
              /* Need to add design for card */
              filter.map((item,index)=>(
                <div key={index} onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                  <img className='bg-blue-50' src={item.image} alt='' />
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Doctors