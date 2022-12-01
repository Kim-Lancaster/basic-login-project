import React, { useContext, useState } from "react";
import LoginForm from "../pages/LoginPage";

const AuthContext = React.createContext(false)

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [errorMsg, setErrorMsg] = useState();

    // function signup(username, password, email){
    //     return fetch("http://localhost:3001/users/signUp", {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({userName: username, userPassword: password, email:email})
    //     })
    // }
    function login(nameAndPassword){
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nameAndPassword)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success === true){
                setCurrentUser(data.text)
            } else {
                setErrorMsg(data.text)
            }
        })
        console.log(user);
    }
    const value = {
        currentUser,
        login
    }
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    );
};