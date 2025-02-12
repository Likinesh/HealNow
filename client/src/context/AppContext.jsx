/* eslint-disable react/prop-types */
import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{
    const currency ='₹'
    const value={ doctors,currency } ;
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}