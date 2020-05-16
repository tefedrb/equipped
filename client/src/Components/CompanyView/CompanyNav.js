import React, { useState, useEffect } from 'react';
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

const Li = styled.li`
    background-color: ${props => props.userCompany ? "none" : "black"};
    margin: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CompanyNav = (props) => {
    const storageSelectedLink = localStorage.getItem("companyViewSelectedLink");
    const [selectedLink, changeSelected] = useState(storageSelectedLink ? storageSelectedLink : userCompany ? userCompany.name : null);

    // const { state } = props.userContext;
    const { userCompany } = props;
    // Here we can iterate over a list of Li's

    const routes = {
        default: "/home/company",
        Equipment: "/home/company/equipment-view",
        Inventory: "/home/company/inventory-view",
    }
    
    const linkTypes = ["Inventory", "Equipment"];

    const saveStateForRefresh = (name) => {
        localStorage.setItem("companyViewSelectedLink", name);
    }

    const changeSelectedOnClick = (name) => {
        changeSelected(name);
        saveStateForRefresh(name);
    }

    useEffect(() => {
        const cache = localStorage.getItem("companyViewSelectedLink");
        changeSelected(cache ? cache : userCompany ? userCompany.name : null);
        return () => {
            console.log("uh?!");
            saveStateForRefresh(userCompany ? userCompany.name : null);
        }
    },[userCompany])

    console.log(userCompany, "????")
    const CompLinks = userCompany ? linkTypes.map((name, id) => {
        return (
            <Li userCompany={userCompany} key={id}>
                <CompLink
                    userContext={props.userContext}
                    key={id}
                    myName={name}
                    selectedLink={selectedLink}
                    changeSelected={changeSelectedOnClick}
                    route={routes[name] ? routes[name] : routes.default}
                />
            </Li>
        )
    }) : ""

    return (
        <Nav id={"company-nav"}>
            <Ul> 
                <Li userCompany={userCompany} style={{width: "1em"}}>
                    <CompanyName>Company:</CompanyName> 
                    {
                        userCompany ? 
                            <CompLink
                                route={routes.default} 
                                compName={true} 
                                myName={userCompany.name} 
                                selectedLink={selectedLink} 
                                changeSelected={changeSelectedOnClick}
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


