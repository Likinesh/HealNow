// import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* --------left section -------*/}
            <div>
                <img onClick={()=>navigate('/')} className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quam aliquam reprehenderit numquam rerum, magni dolore similique vitae distinctio, commodi possimus? Aspernatur qui fugiat accusantium tenetur ab eos tempora quia?</p>
            </div>

            {/* --------center section -------*/}
            <div>
                <p  className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li onClick={()=>navigate('/')} className='cursor-pointer'>Home</li>
                    <li onClick={()=>navigate('/about')} className='cursor-pointer'>About Us</li>
                    <li onClick={()=>navigate('/contact')} className='cursor-pointer'>Contact Us</li>
                    <li><a href='https://github.com/Rahulreddy4444'>Other Products</a></li>
                </ul>
            </div>

            {/* --------right section --------*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
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