import { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { months } from '../constants';
// import { useNavigate } from 'react-router-dom';

const Myappointements = () => {

  const { BackendUrl,utoken,getDoctorsData,userData } = useContext(AppContext)
  const [appointment,set_appointment] = useState([]);

  // const navigate = useNavigate();

  const slotDate_format = (slotDate)=>{
    const dateArray = slotDate.split('_');
    return dateArray[0]+' '+months[Number(dateArray[1])]+' '+dateArray[2]
  }

  const getUserAppointment = async () => {
    try {
      const {data} = await axios.get(BackendUrl+'api/user/appointments',{headers:{utoken}});
      if(data.success){
        set_appointment(data.appointments.reverse());
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) =>{
    try {
      // console.log(userData);
      const userId = userData._id;
      const {data} = await axios.post(BackendUrl+'api/user/cancel-appointment',{userId,appointmentId},{headers:{utoken}})
      if(data.success){
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // const initPay = (order) =>{
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: 'Appointment Payment',
  //     description: 'Appointment Payment',
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) =>{
  //       console.log(response)

  //       try {
  //         const {data} = await axios.post(BackendUrl+'api/user/verifyRazorpay',response,{headers:{utoken}})
  //         if(data.success){
  //           getUserAppointment()
  //           navigate('/my-appointments')
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         toast.error(error.message)
  //       }

  //     }
  //   }

  //   const rzp = new window.RazorPay(options)
  //   rzp.open()
  // }

  // const appointmentRazorpay = async (appointmentId) =>{
  //   try {
  //     const {data} = await axios.post(BackendUrl+'api/user/payment-razorpay',{appointmentId},{headers:{utoken}})
      
  //     if(data.success){
  //       initPay(data.order)
  //     }

  //   } catch (error) {
      
  //   }
  // }

  useEffect(()=>{
    if(utoken){
      getUserAppointment();
    }
  },[utoken]);

  return (
    <div>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
        <div>
          {appointment.map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDate_format(item.slotDate)} | {item.slotTime}</p>
              </div>

              <div></div>
              
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {/* {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300'>Pay Online</button>} */}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded textred500'>Appointment Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'></button>}
              </div>

            </div>
          ))}
        </div>
    </div>
  )
}

export default Myappointements