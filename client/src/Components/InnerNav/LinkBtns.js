import React from 'react';

const LinkBtns = (props) => {

    const linkStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        height: "40px",
        padding: "0 2em",
        backgroundColor: props.activeLink ? "black" : "transparent"
    }
    
    return (
        <div style={linkStyle} onClick={() => props.handleClick()}>
            {props.linkName}
        </div>
    )
 }


export default LinkBtns;