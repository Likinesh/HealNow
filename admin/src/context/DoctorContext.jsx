/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export const DoctorContextProvider = (props) =>{
    
    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setdToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');

    const [appointment,set_Appointment] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

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

    const getDashData = async () =>{
        try {
            const {data} = await axios.get(backendurl + 'api/doctor/dashboard', {headers:{dToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            } 
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getProfileData = async () =>{
        try {
            const {data} = await axios.get(backendurl + 'api/doctor/profile', {headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const value={
        dToken,setdToken,backendurl,appointment,set_Appointment,complete_appointment,cancel_appointment,getAppointments,dashData,setDashData,getDashData, profileData,setProfileData, getProfileData,
    };
    
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}