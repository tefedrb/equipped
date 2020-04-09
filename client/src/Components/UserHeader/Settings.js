import React from 'react';

const Settings = (props) =>{
    // Might be able to use sass here to nest settingsStyle section {} css
    
    let transparentCover = {
        display: props.display ? "flex" : "none",
        position: "absolute",
        justifyContent: "flex-end",
        top: "40px",
        left: "0",
        minHeight: "calc(100vh - 40px)",
        width: "100%",
        backgroundColor: "transparent"
    }
    
    let settingsStyle = {
        // position: "relative",
        display: props.display ? "flex" : "none",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        width: "15em",
        maxHeight: "20em",
        boxShadow: "5px 2px 10px black",
        zIndex: 2
    }

    let flexBox = {
        display: "flex",
        flexDirection: "column",
        height: "4em"
    }
    
    let userDisplay;
    if(props.user){
        const {title, username} = props.user;
        userDisplay =
        <section style={flexBox}>
            <div><span style={{color: "white"}}>Username:</span>{username}</div>
            <div><span style={{color: "white"}}>Title:</span>{title}</div>
            <div><span style={{color: "white"}}>Company:</span></div>
        </section>
    } else {
        userDisplay = <div></div>
    }
   
    return (
        <div onClick={() => props.toggleSettingsDisplay()} style={transparentCover}>
            <div style={settingsStyle} onClick={e => e.stopPropagation()}>
                {userDisplay}
                <section>
                    <button onClick={() => props.logout()}>LOGOUT</button>
                </section>
            </div>
        </div>
    )
}

export default Settings;
