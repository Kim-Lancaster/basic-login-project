import React, { useState } from "react";
import Input from "./Input";

function Profile (props) {

    const [newPassword, setNewPassword] = useState("");
    const [changedPassword, setChanged] = useState(false);

    function onChange(e){
        setNewPassword(e.target.value)
    }
    
    function handlePasswordClick(){
        console.log(newPassword)
        fetch('http://localhost:3001/users/update', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userName: props.user, 
                newPassword: newPassword
            })
    })
    setChanged(true)
}

    function handleLogOutClick(){
        props.setResponse("") 
        props.setLoggedIn(false)
    }

    return <div>
            <h1>Welcome Back {props.user}</h1>
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
        </div>
}

export default Profile;