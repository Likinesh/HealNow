/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext = createContext();
import { toast } from "react-toastify";
export const AppContextProvider = (props) =>{

    const BackendUrl = import.meta.env.VITE_BACKEND_URL
    const currency ='₹';
    const [doctors,set_docs] = useState([]);
    const [userData,set_user] = useState(false);
    const [utoken,set_token] = useState(localStorage.getItem('utoken')?localStorage.getItem('utoken'):'')

    const getDoctorsData = async ()=>{
        try {
            const {data} = await axios.get(BackendUrl+`api/doctor/all-list`);
            if(data.success){
                set_docs(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const userProfile = async()=>{
        try {
            const {data} = await axios.get(BackendUrl+`api/user/get-profile`,{headers:{utoken}});
            if(data.success){
                set_user(data.userData)
                console.log(userData);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getDoctorsData();
    },[]);

    useEffect(()=>{
        if(utoken){
            userProfile();
        }
        else{
            set_user(false);
        }
    },[utoken]);

    const value={ 
        doctors,
        getDoctorsData,
        currency,
        utoken,
        set_token,
        BackendUrl,
        userData,
        set_user,
        userProfile 
    };

        
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}