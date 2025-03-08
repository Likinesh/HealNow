/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios  from 'axios';
import { toast } from 'react-toastify';
export const Admincontext = createContext();

export const AdmincontextProvider = (props) =>{
    const [Token,setToken] = useState(localStorage.getItem('Token')?localStorage.getItem('Token'):'');
    const [doctors,setDoctors] = useState([]);
    const [d_data,set_data]=useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getAllDoctors = async()=>{
        try {
            // console.log(Token);
            const {data} = await axios.post(backendUrl+'api/admin/all-doctors',{},{headers:{Token}});
            if(data.success){
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const changeAvailability = async(docId) =>{
        try {
            const {data} = await axios.post(backendUrl+'api/admin/change-avail',{docId},{headers:{Token}});
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getData = async() => {
        try {
            const { data } = await axios.get(backendUrl+`api/admin/dashboard`,{headers:{Token}});
            if(data.success){
                set_data(data.data);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const cancelAppointment = async()=>{
        try {
            
        } catch (error) {
            toast.error(error.message);    
        }
    }
    const value={
        Token,setToken,backendUrl,cancelAppointment,doctors,getAllDoctors,changeAvailability,getData,d_data
    };
    return(
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )
}