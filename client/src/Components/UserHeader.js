import React, {Component} from 'react';
import '../App.css';
import styled from 'styled-components';

const Div = styled.div`
    color: white;
    position: absolute;
    right: 0;
    padding-right: .5em;
    top: .5em;
`

class UserHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            settingsDisplay: false
        }
    }

    render(){
        let user = this.props.user ? 
        this.props.user.username : "Loading...";
        return (
            <Div>
                {user}
            </Div>
        )
    }
}

export default UserHeader;