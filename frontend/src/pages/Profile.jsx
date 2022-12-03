import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Input from "../components/Input";

function Profile(){

    const [newPassword, setNewPassword] = useState("");
    const [changedPassword, setChanged] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function onChange(e){
        setNewPassword(e.target.value)
    }
    
    //api call to change password and remove the input field
    function handlePasswordClick(){
        fetch('http://localhost:3001/users/update', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userName: user, 
                newPassword: newPassword
            })
    })
        setChanged(true)
    }
    //Log out
    function handleLogOutClick(){
        setUser(null);
        navigate('/');
    }

    return (<>
        <h1>Welcome Back {user}</h1>
        <div className="logged-in">
            {!changedPassword ? <div>
                <Input 
                    onChange={onChange}
                    value={newPassword}
                    type="text"
                    name="userPassword"
                    id="password"
                    />
                <button 
                    onClick={handlePasswordClick}>
                        Change Password
                </button>
            </div> :
            <div className='password-changed-dialog'>
            Your password has been updated
            </div>
            }
            <button onClick={handleLogOutClick}>Log out</button>
        </div>
    </>)
}

export default Profile;