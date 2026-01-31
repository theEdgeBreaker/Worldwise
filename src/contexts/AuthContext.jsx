import {  createContext, useContext, useReducer } from "react";
const AuthContext = createContext();
function reducer(state , action){
    switch (action.type){
        case "login":  
            return {
                ...state , user:action.payload,
                isAuthenticated:true
            }
        case "logout":   
            return {
                ...state , user:null , isAuthenticated:false
            }
        default : throw new Error("Unknown Action")
    }
}

const FAKE_USER = {
  name: "Sanjana",
  email: "Sanjana@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser),
};

function AuthProvider({children}){
    const [{user , isAuthenticated} , dispatch] = useReducer(reducer , initialState)
    function login(email , password){
        if(email ===  FAKE_USER.email && password === FAKE_USER.password){
             localStorage.setItem("user", JSON.stringify(FAKE_USER));
            dispatch({type:"login" , payload:FAKE_USER})
        }
    }

    function logout(){
        localStorage.removeItem("user");
        dispatch({type:"logout"});
    }
    return <AuthContext.Provider value ={{
        isAuthenticated , login , logout , user
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);
    if(AuthContext === undefined) throw new Error("The AuthContext was used outside of its scope");
    return context;
}

export {useAuth , AuthProvider};