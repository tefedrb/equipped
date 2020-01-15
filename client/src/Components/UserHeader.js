import React, {Component} from 'react';
import '../App.css';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    color: white;
    position: absolute;
    right: 0;
    padding-right: .5em;
    top: .5em;
`

const Img = styled.img `
    filter: brightness(0) invert(1);
    padding-left: .5em;
`

class UserHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDisplay: false
        }
    }
    
    componentWillUnmount(){
        console.log("WHAT?!?!?!?!?!? UserHeader");
    }
    
    render(){
        const user = localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')).username : "Loading...";

        const defaultView = localStorage.getItem('user') ? (
        <Div>
            <span>{user}</span>
            <Img src="https://img.icons8.com/android/24/000000/settings.png" 
                alt="settings-wheel"
            />
        </Div>
        ) 
        : 
        <Div></Div>
        return (
            defaultView
        )
    }
}

export default UserHeader;