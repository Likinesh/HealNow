/* eslint-disable react/prop-types */
import { createContext } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = (props) =>{
    const value={};
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}