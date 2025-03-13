/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciaility }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, set_relDoc] = useState([]);

  useEffect(() => {
    console.log(doctors)
    if (doctors.length > 0 && speciaility) {
      const docData = doctors.filter((doc) => doc.speciality === speciaility && doc._id != docId);
      console.log(docData)
      set_relDoc(docData);
    }
  }, [doctors, docId, speciaility])

  return (
    <div className='flexflex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Browse Through our extensive list</p>
      <div className='w-full grid grid-cols-3 { grid-template-columns: repeat(5, minmax(0, 1fr)); } gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div key={index} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
            <img className='bg-blue-50' src={item.image} alt='' />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='bg-blue-50' onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}>To see all doctors</button>
    </div>
  )
}

export default RelatedDoctors