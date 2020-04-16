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
    console.log(item, "< item available to view")
    return (
       <ItemWrapper>
           <img src={item && item.image ? item.image : "none"}></img>
           <p>{item && item.product ? item.product : ""}</p>
           <p>{item && item.value ? "Value: $" + item.value : ""}</p>
           <a target="_blank" href={item && item.prodLink ? item.prodLink : ""}>Product Link</a>
       </ItemWrapper>
    )
}

export default ItemView;