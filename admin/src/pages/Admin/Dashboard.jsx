// import React from 'react'

import { useContext, useEffect } from "react"
import { Admincontext } from "../../context/AdminContext"
import { assets } from "../../assets/assets";
import { Appcontext } from "../../context/Appcontext";

const Dashboard = () => {
  const { Token, getData, d_data, cancelAppointment } = useContext(Admincontext);
  const { slotDateFormat } = useContext(Appcontext)
  useEffect(() => {
    if (Token) {
      getData();
    }
  }, []);
  return d_data && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{d_data.doctors}</p>
            <p className="text-gray-400 ">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{d_data.patients}</p>
            <p className="text-gray-400 ">Patients</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{d_data.appointment}</p>
            <p className="text-gray-400 ">Appointments</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latests Appointment</p>
        </div>

        <div className="pt-4 border border-t-0 ">
          {
            d_data.latestAppointment.map(({ item, index }) => {
              <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                <img className=" rounded-full w-10" src={item.docData.image} />
                <div className=" flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className=" text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ?
                  <p className=" text-red-400 text-xs font-medium">Cancelled</p>
                  : item.isCompleted
                    ? <p className="text-green-500 text-xs font-medium">Completed</p>
                    : <img onClick={cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                }
              </div>
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard