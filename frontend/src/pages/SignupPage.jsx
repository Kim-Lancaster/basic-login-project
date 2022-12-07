import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import Input from "../components/Input";
import Buttons from "../components/Buttons";
import { useNavigate } from 'react-router-dom';

function SignUpForm(props){
    //try useRef for these in the future
    const [userData, setUserData] = useState({
        userName: "",
        userPassword: "",
        email: ""
    })
    const [msg, setMsg] = useState({
        success: "",
        error: ""
    });

    const navigate = useNavigate();
    const { loadingState } = useContext(AuthContext);
    const [loading, setLoading] = loadingState;

    function usernameCheck(input) {
        const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!specialChars.test(input)) {
            return  true
        } else {
            return false
        }
      }

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
        e.preventDefault();
        console.log(usernameCheck(userData.userName))
        if(usernameCheck(userData.userName)){
            fetch("http://localhost:3001/users/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if(data.success === true){
                    setMsg({success: data.text, error: ""})
                    setUserData({
                        userName: "",
                        userPassword: "",
                        email: ""
                    })
                } else {
                    setMsg({success: "", error: data.text})
                    setUserData(prev => {
                        return {
                            ...prev,
                            userName: ""
                        }
                    })
                }
                

            })
        } else {
            setMsg({success: "", error: "Symbols are not allowed"})
        }
       
    };

    function handleClick(){
        navigate('/');
    }
    return (
        <>
        <div className="error">
            <p>{msg.error}</p>
        </div>
        <form className="form">
            <Input
                onChange={handleChange}
                value={userData.userName}
                type="text"
                placeholder="Username"
                name="userName"
                id="userName"
            />
            <Input
                onChange={handleChange}
                value={userData.userPassword}
                type="password"
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
                isDisabled={!userData.userName && !userData.userPassword && !userData.email ? true : loading}
                content="Sign Up"
                onClick={handleSignUp} />
            <Buttons 
                isDisabled={false}
                content="Already have an account?"
                onClick={handleClick} />
        </form>
        <div>
            <p>{msg.success}</p>
        </div>
    </> )
}

export default SignUpForm