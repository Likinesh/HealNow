/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export const DoctorContextProvider = (props) =>{
    
    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setdToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
    const [appointments,set_Appointment] = useState([]);

    const getAppointments =  async()=>{
        try {
            const {data} = axios.get(backendurl+'api/doctor/appointments',{headers:{dToken}})
            if(data.success){
                set_Appointment(data.appointments);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const complete_appointment = async(appointmentId) =>{
        try {
            const {data} = axios.get(backendurl+'api/doctor/complete',{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const cancel_appointment = async(appointmentId) =>{
        try {
            const {data} = axios.get(backendurl+'api/doctor/cancel',{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const value={
        dToken,setdToken,backendurl,appointments,set_Appointment,complete_appointment,cancel_appointment,getAppointments
    };
    
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}