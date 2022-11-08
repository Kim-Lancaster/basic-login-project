import React, {useState} from 'react';
import Input from "./Input";
import Buttons from './Buttons';

function LoginForm(){
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


    return (<form>
        <h4>{nameAndPassword.userName} and {nameAndPassword.userPassword}</h4>
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
        <Buttons type="submit" content="Login" />
        <Buttons content="Sign up" />
    </form>)
}

export default LoginForm