import React from 'react';
import styled from 'styled-components';

const ItemView = (props) => {
    const item = props.itemSelected ? props.itemSelected : null;
    const ItemWrapper = styled.div`
        align-self: right;
        flex-grow: 1;
        background-color: white;
        display: ${item ? "block" : "none"}
        border: 2px solid black;
        padding: 3em;
    `
    const Img = styled.img`
        max-width: 220px;
    `

    console.log(item, "< item available to view")
    return (
       <ItemWrapper>
           <Img src={item && item.image ? item.image : "none"} />
           <p>{item && item.product ? item.product : ""}</p>
           <p>{item && item.subCategory ? "Sub-Category: " + item.subCategory.name : ""}</p>
           <p>{item && item.value ? "Value: $" + item.value : ""}</p>
           <a target="_blank" href={item && item.prodLink ? item.prodLink : ""}>Product Link</a>
       </ItemWrapper>
    )
}

export default ItemView;