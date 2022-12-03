//useContext must be imported to change { authContext }
import React, {useState, useContext} from 'react';
//to navigate between login and signup with button click
import { useNavigate } from 'react-router-dom';
//import the self-created context
import { AuthContext } from '../context/AuthContext';
//imported self-created components
import Input from "../components/Input";
import Buttons from '../components/Buttons';

function LoginForm(){

    //state of typed username and password
    const [nameAndPassword, setNameAndPassword] = useState({
        userName: "",
        userPassword: ""
    })
    const [errorMsg, setErrorMsg] = useState('');
    //2nd part of the useNavigate hook
    const navigate = useNavigate();
    // I have no idea why???????????
    const { user, setUser } = useContext(AuthContext);

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
    //when login button is clicked
    function handleLogin(e){
        e.preventDefault();
        console.log('working')
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nameAndPassword)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.success == true){
                setUser(data.text)
                navigate(`/user/${data.text}`);
            } else {
                setErrorMsg(data.text)
                setNameAndPassword({
                    userName: "",
                    userPassword: ""
                })
            }
        })
    }

    return (<>
    <div className='error'>
        <p>{errorMsg}</p>
    </div>
    <form>
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
        <Buttons content="Sign up" onClick={() => navigate('/signup')}/>
    </form>
    <p className='forgot' onClick={() => navigate('/forgotpassword')}>Forgot Password?</p>
    <p>{user}</p>
    </>)
}

export default LoginForm