import { useCallback, useEffect, useReducer } from "react"

import { CitiesContext } from "../hooks/CitiesContexts";

// const CitiesContext = createContext();

const BASE_URL = "http://localhost:3001/"

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state, isLoading: true
            }
        case "cities/loaded":
            return {
                ...state, isLoading: false, cities: action.payload
            }
        case "city/loaded":
            return {
                ...state, isLoading: false, currentCity: action.payload
            }
        case "city/created":
            return {
                ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload
            }
        case "city/deleted":
            return {
                ...state, isLoading: false, cities: state.cities.filter(item => item._id !== action.payload), currentCity: state.currentCity
            }
        case "rejected":
            return {
                ...state, isLoading: false
            }
        default: throw new Error("Unknown dispatch ")
    }
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
    // These becomes the initial state
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" })
            try {
                const res = await fetch(`${BASE_URL}cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                console.log(error);
                dispatch({ type: "rejected", payload: "There was error while loading" })
            }
        }
        fetchCities();
    }, [])

    const getCity = useCallback(async function getCity(id) {
        dispatch({ type: "loading" })

        try {
            const res = await fetch(`${BASE_URL}cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data })
        }
        catch (error) {
            dispatch({ type: "rejected", payload: "There was error while loading city" });
            console.log(error);
        }
    }, [])
    async function createCity(newCity) {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`${BASE_URL}cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data })
        }
        catch (error) {
            dispatch({ type: "rejected", payload: "There was error while creating a city" })
            console.log(error);
        }
    }
    async function deleteCity(id) {
        dispatch({ type: "loading" })
        try {
            await fetch(`${BASE_URL}cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id })
        }
        catch (error) {
            dispatch({ type: "rejected", payload: "There was error while deleting a city" });
            console.log(error);
        }
    }
    return (
        <CitiesContext.Provider value={{
            cities, isLoading, currentCity, getCity, createCity, deleteCity, error
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

//  function useCities() {
//     const context = useContext(CitiesContext);
//     if (context === undefined) throw new Error("The context was used outside the cities provider")
//     return context
// }

// export { useCities, CitiesProvider };

export default CitiesProvider