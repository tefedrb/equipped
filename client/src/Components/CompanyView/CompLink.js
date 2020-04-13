import React from 'react';
import styled from 'styled-components';

const CompLink = (props) => {
    // Add a way to accept a callback function that activates onclick
    const Button = styled.div`
        background-color: ${props.selectedLink === props.myName ? "transparent" : "black"};
        color: ${props.selectedLink === props.myName ? "white" : "#69cb42"};
        padding-left: ${props.compName ? ".5em" : "0"};
        text-shadow: 2px 2px #000000;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: ${props.compName ? "left" : "center"};
        align-items: center;
        cursor: pointer;
    `
    return (
        <Button onClick={() => props.changeSelected(props.myName)}>
            <span>{props.myName}</span>
        </Button>
    )
}

export default CompLink;