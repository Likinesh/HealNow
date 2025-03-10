/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = (props) =>{
    
    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setdToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
        
    
    const value={
        dToken,setdToken,backendurl
    };
    
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}