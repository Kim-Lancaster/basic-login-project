import React, { useState } from "react";
import Input from "./Input";
import Buttons from "./Buttons";


function SignUpForm(props){
    
    const [userData, setUserData] = useState({
        userName: "",
        userPassword: "",
        email: ""
    })
    
    function handleChange(e){
        const {name, value} = e.target;

        setUserData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
    function handleSignUp(e){
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            cache: "no-store",
            body: JSON.stringify(userData)
        }

        fetch("http://localhost:3001/users/signUp", options)
        .then(response => response.text())
        .then(data => {
            props.setResponse(data)
        })
        
    }

    return (<form className="form">
        <Input
            onChange={handleChange}
            value={userData.userName}
            type="text"
            placeholder="User name"
            name="userName"
            id="userName"
        />
        <Input
            onChange={handleChange}
            value={userData.userPassword}
            type="text"
            placeholder="Password"
            name="userPassword"
            id="userPassword"
        />
        <Input
            onChange={handleChange}
            value={userData.email}
            type="email"
            placeholder="Email"
            name="email"
            id="email"
        />
        <Buttons 
            content="Sign Up"
            onClick={handleSignUp} />
        <Buttons 
            content="Already have an account?"
            onClick={() => {props.setSignUp(false)}} />
    </form>)
}

export default SignUpForm