import React from 'react';
import styled from 'styled-components';

const InventoryItem = (props) => {
    const ItemWrapper = styled.aside`
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 10em;
        background-color: white;
    `
    const ProductInfo = styled.section`
        flex-grow: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: .5em;
    `
    const Image = styled.img`
        width: 15vw;
    `
    // Product Name, picture, users associated,
    const {selectedItem, userName, itemTable} = props;
    console.log(selectedItem, userName, 'SELECTED');

    const Detail = styled.p`
        margin: .2em;
        font-size: .9em;
    `
    const color = {
        color: '#69cb42',
    }

    const numAvailable = props.itemTable.available.reduce((acc, cur) =>{
        if(cur){
            acc += 1;
        }
        return acc;
    },0)
    
    const reservervationButton = (() => {
        const nextAvailable = itemTable.available.findIndex(bool => bool);
        const itemId = itemTable.iterations[nextAvailable];
        let output;
        if(nextAvailable >= 0){
            output = <button onClick={() => props.reserveItem(userName, itemId)}>Take Out</button>
        } else {
            // here we can create logic that tells whether to have this be an n/a or return button
            // Need to add logic for when a user leaves the company - remove all of his names
            if(itemTable.itemUser === userName) {
                output = <button onClick={() => props.returnItem(userName, itemId)}>Return Item</button>
            } else {
                output = <button>N/A</button>
            }
        }
        return output;
    })();

    return(
        <ItemWrapper id={"item-wrap"}>
            <ProductInfo>
                <p>{`Num Available: ${numAvailable}/${props.itemTable.iterations.length}`}</p>
                <p>{selectedItem.available ? "Available" : "Not Available"}</p>
                {reservervationButton}
                <p>{selectedItem.available ? "" : `Out with: ${selectedItem.itemUser}`}</p>
            </ProductInfo>
            <ProductInfo>
                <Image src={selectedItem.image}></Image>
                <Detail>{selectedItem.product}</Detail>
                <Detail><span style={color}>Category: </span>{selectedItem.category.toUpperCase()}</Detail>
                <Detail><span style={color}>Sub-category: </span> {selectedItem.subCategory}</Detail>
                <Detail><span style={color}>Value: </span>${selectedItem.value}</Detail>
                <Detail><a style={{fontSize: '.5em', ...color}} href={selectedItem.prodLink}>Product Link</a></Detail>
            </ProductInfo>
        </ItemWrapper>
    )
}

export default InventoryItem;