import React, { useState } from "react";
import Input from "./Input";

function Profile (props) {

    const [newPassword, setNewPassword] = useState();
    const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            userName: props.apiResponse, 
            newPassword: newPassword
        })
    }
    function onChange(e){
        setNewPassword(e.target.value)//stopped here 
        //don't know if it is a problem but state printed to the console
        //seems to always be on char behind.
        //have not tested if this will be true on click when
        //state value us transfered to the backend.
    }
    function handlePasswordClick(){
        fetch('http://localhost:3001/users/update', options)
    }
    function handleLogOutClick(){
        props.setResponse("") 
        props.setLoggedIn(false)
    }

    return <div>
            <h1>Welcome Back {props.user}</h1>
            <div className="logged-in">
                <Input 
                    onChange={onChange}
                    value={newPassword}
                    type="text"
                    name="userPassword"
                    id="password"
                    />
                <button onClick={handlePasswordClick}>Change Password</button>
                <button onClick={handleLogOutClick}>Log out</button>
            </div>
        </div>
}

export default Profile;