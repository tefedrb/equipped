import React, {Component} from 'react';
import styled from 'styled-components';
import Settings from './Settings';

const Div = styled.div`
    display: flex;
    color: white;
    position: absolute;
    right: 0;
    padding-right: .5em;
    top: .5em;
`

const Img = styled.img`
    filter: brightness(0) invert(1);
    padding-left: .5em;
    &:hover{
        cursor: pointer
    }
`

class UserHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDisplay: false,
            settingsDisplay: false
        }
    }
    
    handleClick = () => {
        this.setState({
            settingsDisplay: !this.state.settingsDisplay
        })
    }

    render(){
        const user = localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')).username : "Loading...";

        const defaultView = localStorage.getItem('user') ? (
        <Div>
            <span>{user}</span>
            <Img onClick={this.handleClick} src="https://img.icons8.com/android/24/000000/settings.png" 
                alt="settings-wheel"
            /> 
        </Div>
        ) 
        : 
        <Div>
            
        </Div>
        return (
            <div>
                {defaultView}
                <Settings display={this.state.settingsDisplay} />
            </div>
        )
    }
}

export default UserHeader;