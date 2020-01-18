import React, {Component} from 'react';
import styled from 'styled-components';
import LinkBtns from './LinkBtns';
import {NavLink} from 'react-router-dom';

const Div = styled.div `
    display: flex;
    align-items: center;
    flex-direction: row; 
    justify-content: space-around; 
    width: 100%;
    height: 40px;
    background-color: rgba(57, 57, 57, 0.8);
`

class InnerNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeLink: ''
        }
    }

    activateLink = (linkName) => {
        this.setState({
            activeLink: linkName
        })
    }

    render(){
        return (
            <Div>
                <NavLink to="/home">
                    <LinkBtns 
                        linkName={"Home"} 
                        activeLink={this.state.activeLink} 
                        activateLink={this.activateLink} 
                    />
                </NavLink>
                <NavLink to="/home/company">
                    <LinkBtns 
                        linkName={"Company View"} 
                        activeLink={this.state.activeLink} 
                        activateLink={this.activateLink} 
                    />
                </NavLink>
            </Div>
        )
    }
}

export default InnerNav;