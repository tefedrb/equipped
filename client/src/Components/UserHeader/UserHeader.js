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
        const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        console.log(this.props.user, "<USER HEAD PROPS");
        this.setState({
            user: loggedInUser
        })
    }

    componentDidUpdate(){
        // This condition is here in order to get userHeader to properly display
        // itself and pass down user data to settings after the asynchronous call from
        // the getUser method (in app.js) which is invoked during an initial login or
        // signup
        if(this.props.user && this.state.user == null){
            this.setState({
                user: this.props.user,
                userDisplay: true
            })
        }
    }

    handleClick = () => {
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
                <Img onClick={this.handleClick} src="https://img.icons8.com/android/24/000000/settings.png" 
                    alt="settings-wheel"
                /> 
            </Div>
            ) 
            : null
        return (
            <div>
                {defaultView}
                <Settings user={this.state.user} display={this.state.settingsDisplay} />
            </div>
        )
    }
}

export default UserHeader;