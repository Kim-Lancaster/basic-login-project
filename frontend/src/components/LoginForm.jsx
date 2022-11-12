import React, {useState} from 'react';
import Input from "./Input";
import Buttons from './Buttons';

function LoginForm(props){
    const [nameAndPassword, setNameAndPassword] = useState({
        userName: "",
        userPassword: ""
    })

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
            props.setResponse("Please enter a username and password");
        }
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            cache: "no-store",
            body: JSON.stringify(nameAndPassword)
        }
        fetch("http://localhost:3001/users/login", options)
        .then(res => res.text())
        .then(data => {
            props.setResponse(data)
        })
    }

    return (<form>
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
        <Buttons content="Sign up" onClick={() => { props.setSignUp(true)}}/>
    </form>)
}

export default LoginForm