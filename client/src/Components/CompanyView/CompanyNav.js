import React, {useState} from 'react';
import styled from 'styled-components';
import CompLink from './CompLink';

const Nav = styled.nav `
    background-color: transparent;
    height: 2em;
    display: flex;
    color: #69cb42;
`
const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1em;
`
const Span = styled.span`
    text-align: left;
    margin: 0;
    width: 100%;
    font-size: 1em;
`
const CompanyName = styled.span`
    line-height: 2em;
    height: 100%;
    color: white;
    padding: 0 .5em;
    background-color: black;
`

const CompanyNav = (props) => {
    const [selectedLink, changeSelected] = useState(props.userCompany ? props.userCompany.name : null);
    // Here we can iterate over a list of Li's
    const Li = styled.li`
        background-color: ${props.userCompany ? "none" : "black"};
        margin: 0;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const routes = {
        default: "/home/company",
        Equipment: "/home/company/equipment-view",
        Inventory: "/home/company/inventory-view"
    }
    
    const linkTypes = ["Inventory", "Equipment", "Users", "Wait List"];
    const { state } = props.userContext;
    const CompLinks = state.userCompany ? linkTypes.map((name, id) => {
        return (
            <Li key={id}>
                <CompLink
                    userContext={props.userContext}
                    key={id}
                    myName={name}
                    selectedLink={selectedLink}
                    changeSelected={changeSelected}
                    route={routes[name] ? routes[name] : routes.default}
                />
            </Li>
        )
    }) : ""

    return (
        <Nav>
            <Ul> 
                <Li>
                    <CompanyName>Company:</CompanyName> 
                    {
                        state.userCompany ? 
                            <CompLink
                                route={routes.default} 
                                compName={true} 
                                myName={state.userCompany.name} 
                                selectedLink={selectedLink} 
                                changeSelected={changeSelected}
                            /> 
                            : 
                            <Span>No Company</Span>
                    }
                </Li>
                {CompLinks}
            </Ul>
        </Nav>
    )
}

export default CompanyNav;