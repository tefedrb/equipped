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
    const { selectedItem, userName, itemTable } = props;

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
    
    const reservervationButton = () => {
        const nextAvailable = itemTable.available.findIndex(bool => bool);
        const itemId = itemTable.iterations[nextAvailable];
        let output;
        if(nextAvailable >= 0){
            output = <button onClick={() => props.reserveItem(userName, itemId)}>Take Out</button>  
        } else {
            output = <button>N/A</button>
        }
        return output;
    };

    const returnItem = () => {
        const lastIndex = itemTable[userName] ? itemTable[userName].length-1 : null;
        const nextReservedId = itemTable[userName] ? itemTable[userName][lastIndex] : null;

        if(nextReservedId){
            return <button onClick={() => props.returnItem()}>Return Item</button>
        }
    }

    const outWith = (itemObj) => {
        let output = [];
        for(const item in itemObj){
            if(item !== "available" && item !== "iterations"){
                output.push([item, itemObj[item].length])
            }
        }
        return output.map((user, id) => <p key={id}>Out with: {user[0] + (user[1] > 1 ? ` x${(user[1])}` : "")}</p>);
    }

    return (
        <ItemWrapper id={"item-wrap"}>
            <ProductInfo>
                <p>{`Num Available: ${numAvailable}/${props.itemTable.iterations.length}`}</p>
                {reservervationButton()}
                {returnItem()}
                {outWith(props.itemTable)}
                {outWith()}
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