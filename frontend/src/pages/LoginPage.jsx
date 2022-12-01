import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Input from "./Input";
import Buttons from './Buttons';

function LoginForm(props){

    //state of typed username and password
    const [nameAndPassword, setNameAndPassword] = useState({
        userName: "",
        userPassword: ""
    })
    //sets navigate to useNavigate hook
    const navigate = useNavigate();

    //handle every key stroke of input field
    function handleChange(e){
        const {value, name} = e.target;

        setNameAndPassword(prevValue => {
           return{
            ...prevValue,
            [name]: value
           } 
        })
    }
    //destructures login from useAuth hook - that I created
    const { login } = useAuth();
    //when login button is clicked
    //first the user's input is validated
    //Then we call the imported login function from useAuth hook
    //It returns a promise that has to be handled and saved to a state
    async function handleLogin(e){
        e.preventDefault();
        console.log("test")
        await login(nameAndPassword);
    }
    //Second part of the useNavigate hook
    //will redirect to signup page if button is clicked
    function handleClick(){
        navigate('/signup');
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
        <Buttons content="Login" onClick={handleLogin}/>
        <Buttons content="Sign up" onClick={handleClick}/>
    </form>)
}

export default LoginForm