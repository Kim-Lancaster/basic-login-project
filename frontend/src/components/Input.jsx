import React from "react";

function Input(props) {
    return <input 
        onChange={props.onChange}
        value={props.value}
        type={props.type} 
        placeholder={props.placeholder} 
        name={props.name} 
        id={props.id} 
        />
}

export default Input;