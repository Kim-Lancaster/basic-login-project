import React, { useState } from "react";
import Input from "./Input";
import Buttons from "./Buttons";


function SignUpForm(){
    
    const [text, setText] = useState("")
    
    function handleChange(e){
        setText(text + e.target.value)
    }
    function handleClick(){
        console.log(text)
    }

    return (<form className="form">
        <Input 
            onChange={handleChange}
            value={text}
            type="text"
            placeholder="First name"
            name="fName"
            id="fName"
        />
        <Input
            onChange={handleChange}
            value={text}
            type="text"
            placeholder="Last name"
            name="lName"
            id="lName"
        />
        <Input
            onChange={handleChange}
            value={text}
            type="email"
            placeholder="email"
            name="email"
            id="email"
        />
        <Buttons 
            content="Sign Up"
            onClick={handleClick} />
    </form>)
}

export default SignUpForm