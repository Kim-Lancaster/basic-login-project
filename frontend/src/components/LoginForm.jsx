import React, {useState} from 'react';
import Input from "./Input";
import Buttons from './Buttons';

function LoginForm(){
    const [nameAndPassword, setNameAndPassword] = useState({
        userName: "",
        userPassword: ""
    })

    const [apiResponse, setResponse] = useState();

    function handleChange(e){
        const {value, name} = e.target;

        setNameAndPassword(prevValue => {
           return{
            ...prevValue,
            [name]: value
           } 
        })
    }

    async function handlelogin(e){
        e.preventDefault();
        if(nameAndPassword.userName === "" || nameAndPassword.userPassword === ""){
            setResponse("Please enter a username and password");
        }
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nameAndPassword)
        }
        fetch("http://localhost:3001/users/login", options)
        .then(res => res.text())
        .then(data => {
            console.log(data)
        })
    }

    return (<form>
        <h4>{apiResponse}</h4>
        <Input
            onChange={handleChange}
            value={nameAndPassword.userName}
            type="text" 
            placeholder="Username" 
            name="userName" 
            id="username"/>
        <Input
            onChange={handleChange}
            value={nameAndPassword.userPassword}
            type="password" 
            placeholder="Password" 
            name="userPassword" 
            id="password"/>
        <Buttons content="Login" onClick={handlelogin}/>
        <Buttons content="Sign up" />
    </form>)
}

export default LoginForm