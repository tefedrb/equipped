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
    console.log(props.display, "<--------")
    let settingsStyle = {
        position: "absolute",
        display: props.display ? "flex" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        right: 0,
        top: "40px",
        width: "25vw",
        height: "50vh",
        zIndex: 2
    }

    return (
        <div style={settingsStyle}>
            OH
        </div>
    )
}

export default Settings;
