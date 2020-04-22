import React from 'react';
import styled from 'styled-components';

const InventoryItem = (props) => {
    const ItemWrapper = styled.aside`
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 10em;
        border-left: 1px solid black;
        
    `
    // Product Name, picture, users associated,
    return(
        <ItemWrapper id={"item-wrap"}>
            <img src={props.item ? props.item.product : ""}></img>
            <p>Use the Equipment section to find your equipment and build you inventory!</p>
        </ItemWrapper>
    )
}

export default InventoryItem;