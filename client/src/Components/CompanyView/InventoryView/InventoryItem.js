import React from 'react';
import styled from 'styled-components';

const InventoryItem = (props) => {
    const ItemWrapper = styled.aside`
        flex-grow: 1;
        background-color: red;
        border: 5px solid blue;
    `
    // Product Name, picture, users associated,
    return(
        <ItemWrapper>
            <img src={props.item ? props.item.product : ""}></img>
        </ItemWrapper>
    )
}

export default InventoryItem;