import React, { useState } from "react";
import Input from "./Input";
import Buttons from "./Buttons";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginPage";

function SignUpForm(props){
    //try useRef for these in the future
    const [userData, setUserData] = useState({
        userName: "",
        userPassword: "",
        email: "",
        time: new Date()
    })

    const { signup } = useAuth();
    const navigate = useNavigate();
    function handleChange(e){
        const {name, value} = e.target;

        setUserData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    };
    function handleSignUp(e){
        // e.preventDefault();
       //insert username and password validation here
        signup(userName, userPassword, email)
        .then(response => response.json())
        .then(data => {
            props.setResponse(data.text)
            if(data.text === 'That user name already exist!'){
                setUserData(prevValue => {
                return{
                        ...prevValue,
                        userName: ""
                    } 
                })
            } else {
                setUserData({
                    userName: "",
                    userPassword: "",
                    email: ""
                })
                props.setSignUp(false)
            }
            
        })
        .catch(e => {console.log(e)});
        
    };
    function handleClick(){
        navigate('/');
    }
    return (   
        <form className="form">
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
            onClick={handleClick} />
    </form>
    )
}

export default SignUpForm