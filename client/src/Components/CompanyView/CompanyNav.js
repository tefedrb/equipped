import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav `
    background-color: black;
    height: 2em;
    flex-grow: .5;
    display: flex;
    align-items: center;
    justif-content: space-around;
    color: #69cb42;
`
// const H1 = styled.h1`
    
// `

const Ul = styled.ul`
    list-style-type: none;
`
const Li = styled.li`
    margin: 0;
    font-size: 1em;
    padding-left: .5em;
`

const Company = styled.span`
    color: white;
    font-size: .8em;
`

const CompanyNav = (props) => {
    const companyName = props.userCompany ? props.userCompany.name : "No Company";
    console.log("company nav")
    return (
        <>
            <Nav>
                <Ul> 
                    <Li><Company>Company: </Company>{companyName}</Li>
                </Ul>
            </Nav>
        </>
    )
}

export default CompanyNav;