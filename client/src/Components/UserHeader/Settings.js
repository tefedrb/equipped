import React from 'react';
import styled from 'styled-components';
import UserDisplay from '../UserHeader/UserDisplay';
import {UserConsumer} from '../UserContext';

const Settings = (props) => {
    const Cover = styled.div `
        display: ${props.display ? "flex" : "none"};
        position: absolute;
        justify-content: flex-end;
        top: 40px;
        left: 0;
        min-height: calc(100vh - 40px);
        width: 100%;
        background-color: transparent;
    `
    const SettingsStyle = styled.div `
        display: ${props.display ? "flex" : "none"};
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.8);
        width: 15em;
        max-height: 10em;
        box-shadow: 5px 2px 10px black;
        z-index: 2;
    `

    return (
        <Cover onClick={() => props.toggleSettingsDisplay()}>
            <SettingsStyle onClick={e => e.stopPropagation()}>
                <UserConsumer>
                    {context =>
                        <UserDisplay userContext={context} />
                    }
                </UserConsumer>
                <section>
                    <button onClick={() => props.logout()}>LOGOUT</button>
                </section>
            </SettingsStyle>
        </Cover>
    )
}

export default Settings;
