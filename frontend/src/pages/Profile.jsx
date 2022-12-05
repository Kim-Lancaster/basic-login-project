import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Input from "../components/Input";
import Buttons from "../components/Buttons";

function Profile(){

    const [newPassword, setNewPassword] = useState("");
    const [changedPassword, setChanged] = useState(false);
    const { userState, loadingState } = useContext(AuthContext);
    const [user, setUser] = userState;
    const [loading, setLoading] = loadingState;
    const navigate = useNavigate();

    function onChange(e){
        setNewPassword(e.target.value)
    }
    
    //api call to change password and remove the input field
    function handlePasswordClick(){
        setLoading(true)
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
                <Buttons
                    onClick={handlePasswordClick}
                    isDisabled={!newPassword ? true : loading}
                    content="Change Password" />
            </div> :
            <div className='password-changed-dialog'>
            Your password has been updated
            </div>
            }
            <Buttons 
                onClick={handleLogOutClick}
                content="Log out"
                isDisabled={false} />
        </div>
    </>)
}

export default Profile;