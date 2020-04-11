import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import styled from 'styled-components';

const Div = styled.div `
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

function AccessAccount(props){
    console.log("Access Account?")
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