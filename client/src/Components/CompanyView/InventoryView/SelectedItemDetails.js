import React from 'react';
import styled from 'styled-components';

const SelectedItemDetails = (props) => {
    const Overview = styled.div`
        height: 100%;
        padding: 1em;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    return (
        <Overview id={"inventory-overview"}>
            {props.children}
        </Overview>
    )
}

export default SelectedItemDetails;