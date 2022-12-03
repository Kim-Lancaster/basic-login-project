import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Input from '../components/Input';

function Forgotpassword(){
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState({
        success: null,
        error: null
    });

    const navigate = useNavigate();

    function handleChange(e){
       const {value} = e.target;
       setEmail(value);
    }

    function handleClick(e){
        e.preventDefault();
        console.log('testing!')
        fetch('http://localhost:3001/users/forgotpassword', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success === true){
                setMsg({success: data.text, error: null})
            } else {
                setMsg({success: null, error: data.text})
                setEmail("");
            }
        })
    }

    return (
    <>
        <div className='error'>
            <p>{msg.error}</p>
        </div>
        <form className="form">
        {msg.success ? <p>{msg.success}</p> :
        <Input
            onChange={handleChange}
            value={email}
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            />}
        <Buttons
            content="Send Email"
            onClick={handleClick} />
        </form>
        <p className='cancel' onClick={() => navigate('/')}>Back</p>
        </>
        )
}

export default Forgotpassword;