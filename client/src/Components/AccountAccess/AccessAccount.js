import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import styled from 'styled-components';

const Div = styled.div `
    display: flex;
    flex-direction: row;
    height: 200px;
`

function AccessAccount(props){
    return (
        <Div>
            <SignUp 
                getUser={props.getUser}
            />  
            <LogIn
                getUser={props.getUser}
            />
        </Div>
    )
}

export default AccessAccount;