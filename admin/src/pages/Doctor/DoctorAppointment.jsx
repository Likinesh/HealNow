import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { Appcontext } from "../../context/Appcontext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const { getAppointments,dToken,appointments,complete_appointment,cancel_appointment } = useContext(DoctorContext);
  const {currency,calculateAge,slotDateFormat } = useContext(Appcontext);
  useEffect(()=>{
    getAppointments();
    console.log(appointments);
  },[dToken]);

  return (
    <div className="w-full max-w-6xl m-5 ">
          <p className=" mb-3 text-lg font-medium">All Appointments</p>
          <div className=" bg-white rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
            <div className=" hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
              <p>#</p>
              <p>Patient</p>
              <p>Payment</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>
            {
              appointments &&
              appointments.reverse().map((item,index)=>{
                <div key={index} className=" flex  flex-wrap justify-between max-sm:gap-5 max-sm:text-base grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50">
                  <p className="max-sm:hidden">{index+1}</p>
                  <div className=" flex items-center gap-2">
                    <img className=" w-8 rounded-full" src={item.userData.image} alt="" />
                    <p>{item.userData.name}</p>
                  </div>
                  <div>
                    <p className=" text-xs inline border-primary px-2 rounded-full ">{ item.payment ? 'Online' : 'Cash' }</p>
                  </div>
                  <p className=" max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                  <p>{currency}{item.amount}</p>
                  {
                    item.cancelled?
                    <p className=" text-red-400 text-xs font-medium">Cancelled</p>:
                    item.isCompleted?
                    <p className="text-green-500 text-xs font-medium">Completed</p>:
                    <div className=" flex ">
                      <img className="w-10 cursor-pointer" onClick={()=>cancel_appointment(item._id)} src={assets.cancel_icon} alt="" />
                      <img className="w-10 cursor-pointer" onClick={()=>complete_appointment(item._id)} src={assets.tick_icon} alt="" />
                    </div>
                  }
                  
                </div>
              })
            }
          </div>
        </div>
  )
}

export default DoctorAppointment