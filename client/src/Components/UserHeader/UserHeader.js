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
            settingsDisplay: false,
            waitListName: false,
            companyName: false
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.waitListId !== this.props.waitListId){
            this.props.setWaitListCompanyName(this.props.waitListId);
        }
        if(prevProps.waitListCompany !== this.props.waitListCompany){
            this.setState({
                companyName: true
            })
        }
    }

    toggleSettingsDisp = () => {
        this.setState(prev => ({
            settingsDisplay: !prev.settingsDisplay
        }))
    }

    render(){
        const userName = this.props.user ? 
        this.props.user.username : "Loading...";

        const defaultView = (
            <Div>
                <span>{userName}</span>
                <Img onClick={this.toggleSettingsDisp} 
                    src="https://img.icons8.com/android/24/000000/settings.png" 
                    alt="settings-wheel"
                /> 
            </Div>
        ) 
        return (
            <header>
                <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
                <h1>Equipped</h1>
                {this.props.user ? defaultView : null}
                <Settings
                    companyName={this.state.companyName}
                    waitListCompany={this.props.waitListCompany}
                    userCompany={this.props.userCompany} 
                    logout={this.props.logout} 
                    user={this.props.user} 
                    display={this.state.settingsDisplay} 
                    toggleSettingsDisplay={this.toggleSettingsDisp}
                />
            </header>
        )
    }
}

export default UserHeader;