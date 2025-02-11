/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Admincontext = createContext();

export const AdmincontextProvider = (props) =>{
    const [Token,setToken] = useState(localStorage.getItem('Token')?localStorage.getItem('Token'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value={
        Token,setToken,backendUrl
    };
    return(
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )
}