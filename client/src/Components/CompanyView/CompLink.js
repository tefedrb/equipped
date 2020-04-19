import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const CompLink = (props) => {
    // Add a way to accept a callback function that activates onclick
    const Button = styled.div`
        background-color: ${props.selectedLink === props.myName ? "transparent" : "black"};
        color: ${props.selectedLink === props.myName ? "white" : "#69cb42"};
        padding-left: ${props.compName ? ".5em" : "0"};
        text-shadow: 2px 2px #000000;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: ${props.compName ? "left" : "center"};
        align-items: center;
        cursor: pointer;
    `

    const SectionLabel = styled.span `
        color: ${props.selectedLink === props.myName ? "white" : "#69cb42"};
        text-shadow: 2px 2px #000000;
    `

    // Used to refresh company inventory
    const clickFunc = (myName) => {
        if(props.userContext && myName === "Inventory"){
            console.log(props.userContext, "here")
            if(props.userContext.state.userCompany){
                return props.userContext.refreshInventory(props.userContext.state.userCompany.id);
            }
        } else {
            return null;
        }
    }

    return (
        <Button>
            <NavLink onClick={() => clickFunc(props.myName)} style={{textDecoration: 'none'}} to={props.route}>
                <SectionLabel onClick={() => props.changeSelected(props.myName)}>{props.myName}</SectionLabel>
            </NavLink>
        </Button>
    )
}

export default CompLink;