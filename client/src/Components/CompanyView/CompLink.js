import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Button = styled.div`
    background-color: ${props => props.selectedLink === props.myName ? "transparent" : "black"};
    color: ${props => props.selectedLink === props.myName ? "white" : "#69cb42"};
    padding-left: ${props => props.compName ? ".5em" : "0"};
    text-shadow: 2px 2px #000000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: ${props => props.compName ? "left" : "center"};
    align-items: center;
    cursor: pointer;
`

const SectionLabel = styled.span `
    color: ${props => props.selectedLink === props.myName ? "white" : "#69cb42"};
    text-shadow: 2px 2px #000000;
`

const CompLink = (props) => {
    /* 
        props: 
        selectedLink,
        myName,
        compName,
        userContext,
        addToHistory
    */

    // Used to refresh company inventory
    const inventoryRefresh = (myName) => {
        if(props.userContext && myName === "Inventory"){
            const { id } = props.userContext.state.userCompany;
            return props.userContext.refreshInventory(id);
        } else {
            return null;
        }
    }


    
    return (
        <Button selectedLink={props.selectedLink} myName={props.myName} compName={props.compName}>
            <NavLink onClick={() => inventoryRefresh(props.myName)} style={{textDecoration: 'none'}} to={props.route}>
                <SectionLabel selectedLink={props.selectedLink} myName={props.myName} onClick={() => props.changeSelected(props.myName)}>{props.myName}</SectionLabel>
            </NavLink>
        </Button>
    )
}

export default CompLink;