import React from 'react';
import styled from 'styled-components';

const Settings = (props) => {

    const Cover = styled.div `
        display: ${props.display ? "flex" : "none"};
        position: absolute;
        justify-content: flex-end;
        top: 40px;
        left: 0;
        min-height: calc(100vh - 40px);
        width: 100%;
        background-color: transparent;
    `
    const SettingsStyle = styled.div `
        display: ${props.display ? "flex" : "none"};
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.8);
        width: 15em;
        max-height: 10em;
        box-shadow: 5px 2px 10px black;
        z-index: 2;
    `
    let flexBox = {
        display: "flex",
        flexDirection: "column",
        height: "4em"
    }
    
    let userDisplay;
    if(props.user){
        const {title, username, userCompany} = props.user;

        const companyName = userCompany ? 
            userCompany.name : null;

        const waitListName =   
            props.companyName ? 
            props.waitListCompany : "";

        const compOrWaitList = props.waitListCompany ? "On Wait List: " : "Company: ";
        
        userDisplay =
        <section style={flexBox}>
            <div><span style={{color: "white"}}>Username: </span>{username}</div>
            <div><span style={{color: "white"}}>Title: </span>{title}</div>
            <div><span style={{color: "white"}}>{compOrWaitList} </span>{companyName ? companyName : waitListName}</div>
        </section>;
    } else {
        userDisplay = <div></div>;
    }
   
    return (
        <Cover onClick={() => props.toggleSettingsDisplay()}>
            <SettingsStyle onClick={e => e.stopPropagation()}>
                {userDisplay}
                <section>
                    <button onClick={() => props.logout()}>LOGOUT</button>
                </section>
            </SettingsStyle>
        </Cover>
    )
}

export default Settings;
