import React, {Component} from 'react';
import styled from 'styled-components';
import LinkBtns from './LinkBtns';
import {NavLink} from 'react-router-dom';

const Div = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around; 
    width: 100%;
    height: 40px;
    background-color: rgba(57, 57, 57, 0.8);
`

class InnerNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeLink: null
        }
    }

    activateLink = (linkName) => {
        this.setState({
            activeLink: linkName
        })
    }

    checkIfActive = (linkName) => {
        return this.state.activeLink === linkName ? true : false;
    }

    componentDidMount(){
        this.setState({
            activeLink: this.props.mainLoaded ? "Main" : "Company View"
        })
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({
                activeLink: this.props.mainLoaded ? "Main" : "Company View"
            })
        }
    }

    render(){
        console.log("rendered!")
        return (
            <Div>
                <NavLink style={{textDecoration: 'none'}} to="/home">
                    <LinkBtns 
                        activeLink={this.checkIfActive("Main")}
                        linkName={"Main"}
                        handleClick={() => this.activateLink("Main")} 
                        activateLink={this.activateLink} 
                    />
                </NavLink>
                <NavLink style={{textDecoration: 'none'}} to="/home/company">
                    <LinkBtns 
                        activeLink={this.checkIfActive("Company View")}
                        linkName={"Company View"} 
                        handleClick={() => this.activateLink("Company View")}
                        activateLink={this.activateLink} 
                    />
                </NavLink>
            </Div>
        )
    }
}

export default InnerNav;