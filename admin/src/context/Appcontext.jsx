/* eslint-disable react/prop-types */
import { createContext } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = (props) =>{
    const currency = '$';
    const calculateAge = (dob) => {
        const today = new Date();
        const Birth_date = new Date(dob);
        let age = today.getFullYear() - Birth_date.getFullYear();
        return age;
    }
    const months = ["","Jan","Feb","Mar",'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const slotDateFormat = (slotDate) =>{
        const dateArray = slotDate.split('_');
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
    }
    const value={ currency,calculateAge,slotDateFormat };
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}