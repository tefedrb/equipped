import React from 'react';
import styled from 'styled-components';

const InventoryOverview = (props) => {
    const Overview = styled.div`
        height: 100%;
        padding: 1em;
        flex-grow: 1;
        display: flex;
        align-items: center;
    `

    return (
        <Overview id={"inventory-overview"}>
            {props.children}
        </Overview>
    )
}

export default InventoryOverview;