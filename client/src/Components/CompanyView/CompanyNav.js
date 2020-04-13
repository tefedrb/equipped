import React, {useState} from 'react';
import styled from 'styled-components';
import CompLink from './CompLink';

const Nav = styled.nav `
    background-color: transparent;
    height: 2em;
    flex-grow: .5;
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
    const linkTypes = ["Inventory", "Equipment", "Users", "Wait List"];
    const CompLinks = props.userCompany ? linkTypes.map((name, id) => {
        console.log("yeah dogs")
        return <Li key={id}><CompLink myName={name} selectedLink={selectedLink} changeSelected={changeSelected} key={id}/></Li>
    }) : ""

    return (
        <Nav>
            <Ul> 
                <Li>
                    <CompanyName>Company:</CompanyName> 
                    {
                        props.userCompany ? 
                            <CompLink 
                                compName={true} 
                                myName={props.userCompany.name} 
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