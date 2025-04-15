// import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10 text-white'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* --------left section -------*/}
            <div>
                <img onClick={()=>navigate('/')} className='mb-5 w-40' src={logo} alt="" />
                <p className='w-full md:w-2/3  leading-6'>Welcome to HealNow, your trusted partner in managing your healthcare needs conveniently and efficiently. At HealNow, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            </div>

            {/* --------center section -------*/}
            <div>
                <p  className='text-xl font-medium mb-5'>Services</p>
                <ul className='flex flex-col gap-2 '>
                    {/* <li onClick={()=>navigate('/')} className='cursor-pointer'>Home</li> */}
                    <li onClick={()=>navigate('/about')} className='cursor-pointer text-xl'>About Us</li>
                    <li onClick={()=>navigate('/contact')} className='cursor-pointer text-xl'>Contact Us</li>
                    <li><a href='https://heal-now-likineshs-projects.vercel.app/' className=' text-xl text-blue-300'>Admin Panel</a></li>
                </ul>
            </div>

            {/* --------right section --------*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 '>
                    <li><a href="tel:+918838823880">+91-8838823880</a></li>
                    <li><a  href='mailto:healnow108@gmail.com'>healnow108@gmail.com</a></li>
                </ul>
            </div>
        </div>

        {/* copyright text */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ HealNow - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer