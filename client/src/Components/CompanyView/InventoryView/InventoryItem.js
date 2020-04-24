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
        padding: .5em;
    `
    const Image = styled.img`
        width: 15vw;
    `
    // Product Name, picture, users associated,
    const {selectedItem, userName} = props;
    console.log(selectedItem, userName, 'SELECTED');

    const missingItemsMsg = props.selectedItem ? "" : 
        <p>Use the Equipment section to find your equipment and build you inventory!</p>

    const Detail = styled.p`
        margin: .2em;
        font-size: .9em;
    `
    const color = {
        color: '#69cb42',
    }

    // Should be able to find out how many items are taken out in InventoryView state
    const numAvailable = props.itemTable.available.reduce((acc, cur) =>{
        if(cur){
            acc += 1;
        }
        return acc;
    },0)
    
    const reserveButton = (() => {
        // Grab itemTable, iterate over available, find the index where there is a true value, use that index
        // Number to set the button - with the proper item id passed into the reserveItem function
        const nextAvailable = props.itemTable.available.findIndex(bool => bool);
        console.log(nextAvailable, "!!!!!")
        let output;
        
        if(nextAvailable >= 0){
            const itemId = props.itemTable.iterations[nextAvailable];
            output = <button onClick={() => props.reserveItem(userName, false, itemId)}>Take Out</button>
        } else {
            output = <button>N/A</button>
        }
        return output;
    })();

    return(
        <ItemWrapper id={"item-wrap"}>
            <ProductInfo>
                <p>{`Num Available: ${numAvailable}/${props.itemTable.iterations.length}`}</p>
                <p>{selectedItem.available ? "Available" : "Not Available"}</p>
                {reserveButton}
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