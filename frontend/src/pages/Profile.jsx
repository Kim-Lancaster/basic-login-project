import React, { useState } from "react";
import Input from "./Input";

function Profile (props) {

    const [newPassword, setNewPassword] = useState("");
    const [changedPassword, setChanged] = useState(false);

    function onChange(e){
        setNewPassword(e.target.value)
    }
    
    //api call to change password and remove the input field
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
    //Log out
    function handleLogOutClick(){
        props.setResponse("") 
        props.setLoggedIn(false)
    }

    //handle if credentials are good
    //because this uses routes there needs to be a way to restrict access
    //if the url is manually typed in
    if(props.apiResponse.success){
        return <>
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
        </>
    } else {
        return <h3>Something went wrong</h3>
    }
}

export default Profile;