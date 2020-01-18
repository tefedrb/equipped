import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import styled from 'styled-components';

const Div = styled.div `
    display: flex;
    flex-direction: row;
`

function AccessAccount(props){
    return (
        <Div>
            <SignUp updateJwt={props.updateJwt}
                getUser={props.getUser}
            />  
            <LogIn updateJwt={props.updateJwt}
                getUser={props.getUser}
            />
        </Div>
    )
}

export default AccessAccount;