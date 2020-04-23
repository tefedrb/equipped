import React from 'react';
import styled from 'styled-components';

const InventoryItem = (props) => {
    const ItemWrapper = styled.aside`
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 10em;
        border-left: ${props.selectedItem ? null : "1px solid black"};
        background-color: white;
    `
    const ProductInfo = styled.section`
        flex-grow: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
    `
    const Image = styled.img`
        width: 15vw;
    `
    // Product Name, picture, users associated,
    const {selectedItem} = props;
    console.log(selectedItem, 'SELECTED');
    const missingItemsMsg = props.selectedItem ? "" : 
        <p>Use the Equipment section to find your equipment and build you inventory!</p>

    const Detail = styled.p`
        margin: .2em;
        font-size: .9em;
    `
    const color = {
        color: '#69cb42'
    }
    return(
        <ItemWrapper id={"item-wrap"}>
            <ProductInfo>
                <p>{selectedItem.available ? "Available" : "Not Available"}</p>
                <button>Take Out</button>
                <p>{selectedItem.available ? "" : `Out with: ${selectedItem.itemUser}`}</p>
            </ProductInfo>
            <ProductInfo>
                <Image src={selectedItem.image}></Image>
                <Detail>{selectedItem.product}</Detail>
                <Detail><span style={color}>Category: </span>{selectedItem.category.toUpperCase()}</Detail>
                <Detail><span style={color}>Sub-category: </span> {selectedItem.subCategory}</Detail>
                <Detail><span style={color}>Value: </span>${selectedItem.value}</Detail>
            </ProductInfo>
        </ItemWrapper>
    )
}

export default InventoryItem;