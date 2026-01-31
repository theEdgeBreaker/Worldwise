import { createContext, useContext } from "react";


const CitiesContext = createContext();

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined)
        throw new Error("useCities must be used inside CitiesProvider");

    return context;
}

export {useCities , CitiesContext};