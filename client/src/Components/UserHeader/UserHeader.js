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
            user: null,
            userDisplay: false,
            settingsDisplay: false
        }
    }

    componentDidMount(){
        console.log("UserHeader mount");
    }

    componentDidUpdate(){
        // This condition is here in order to get userHeader to properly display
        // itself and pass down user data to Settings after the asynchronous call from
        // the getUser method (in app.js) which is invoked during an initial login or
        // signup
        if(this.props.user && this.state.user == null){
            this.setState({
                user: this.props.user,
                userDisplay: true
            })
        }
    }

    toggleSettingsDisp = () => {
        this.setState(prev => ({
            settingsDisplay: !prev.settingsDisplay
        }))
    }

    render(){
        const user = this.state.user ? 
        this.state.user.username : "Loading...";

        const defaultView = this.state.user ? (
            <Div>
                <span>{user}</span>
                <Img onClick={this.toggleSettingsDisp} 
                    src="https://img.icons8.com/android/24/000000/settings.png" 
                    alt="settings-wheel"
                /> 
            </Div>
            ) 
            : null
        return (
            <header>
                <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
                <h1>Equipped</h1>
                {defaultView}
                <Settings 
                    logout={this.props.logout} 
                    user={this.state.user} 
                    display={this.state.settingsDisplay} 
                    toggleSettingsDisplay={this.toggleSettingsDisp}
                />
            </header>
        )
    }
}

export default UserHeader;