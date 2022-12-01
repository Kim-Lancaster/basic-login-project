import React, { useState } from "react";

function Buttons(props){
    const [isMouseOver, setMouseOver] = useState(false);

    function handleMouseOver(){
        setMouseOver(true)
    }

    function handleMouseOut(){
        setMouseOver(false);
    }

    return(
    <button
    style={isMouseOver ? {backgroundColor: "black"} : {backgroundColor: 'white'}}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    onClick={props.onClick}
    >
        {props.content}
    </button>
    )
}

export default Buttons