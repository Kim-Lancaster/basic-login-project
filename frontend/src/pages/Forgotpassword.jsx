import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Input from '../components/Input';
import { AuthContext } from '../context/AuthContext';

function Forgotpassword(){
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState(null);
    
    const navigate = useNavigate();

    const { loadingState } = useContext(AuthContext);
    const [loading, setLoading] = loadingState;

    function handleChange(e){
       const {value} = e.target;
       setEmail(value);
    }

    function handleClick(e){
        e.preventDefault();
        console.log('testing!');
        setLoading(true);
        fetch('http://localhost:3001/users/forgotpassword', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email})
        })
        setMsg('Email sent, please check your inbox.')
        setLoading(false)
    }

    return (
    <>
        <form className="form">
        {msg ? <p>{msg}</p> :
        <>
        <Input
            onChange={handleChange}
            value={email}
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            />
        <Buttons
            isDisabled={!email ? true : loading}
            content="Send Email"
            onClick={handleClick} />
            </>}
        </form>
        <p className='cancel' onClick={() => navigate('/')}>Back</p>
        </>
        )
}

export default Forgotpassword;