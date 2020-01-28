import React from 'react';
// const Aside = styled.aside `
//     position: absolute;
//     display: flex;
//     background-color: black;
//     right: 0;
//     top: 40px;
//     width: 100px;
//     height: 200px;
//     z-index: 2;
// `
const Settings = (props) =>{
    // Might be able to use sass here to nest settingsStyle section {} css
    let settingsStyle = {
        position: "absolute",
        display: props.display ? "flex" : "none",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        right: 0,
        top: "40px",
        width: "25vw",
        height: "50vh",
        zIndex: 2,
        boxShadow: "5px 2px 10px black"
    }

    let flexBox = {
        display: "flex",
        flexDirection: "column",
        height: "4em"
    }
    
    let userDisplay;
    if(props.user){
        const {title, username} = props.user;
        console.log(props.user, "<--here we go")
        userDisplay =
        <section style={flexBox}>
            <div><span style={{color: "white"}}>Username:</span>{username}</div>
            <div><span style={{color: "white"}}>Title:</span>{title}</div>
            <div><span style={{color: "white"}}>Company:</span></div>
        </section>
    } else {
        console.log("USER DISPLAY FAIL??", props.user)
        userDisplay = <div></div>
    }
   
    return (
        <div style={settingsStyle}>
            {userDisplay}
            <section>
                <button>LOGOUT</button>
            </section>
        </div>
    )
}

export default Settings;
