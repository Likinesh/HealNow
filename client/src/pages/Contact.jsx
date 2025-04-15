import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='text-white'>
        <div className='text-center text-2xl pt-10 '>
          <p>CONTACT <span className='font-semibold'>US</span></p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg '>Our Office</p>
            <p className=''>00000 Willms Station <br />Suite 000, Washington, USA</p>
            <p className=''>Tel: (000) 000-0000 <br /> Email: healnow@gmail.com</p>
            <p className='font-semibold text-lg '>CAREERS AT HEALNOW</p>
            <p className=''>Learn more about our teams and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
        </div>

    </div>
  )
}

export default Contact