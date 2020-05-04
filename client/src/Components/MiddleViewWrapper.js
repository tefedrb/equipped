import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.section`
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: rgba(255,255,255,0.4);
    margin: 3%;
`

const MiddleViewWrapper = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default MiddleViewWrapper;