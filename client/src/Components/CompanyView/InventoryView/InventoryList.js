import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import ListItem from '../ListItem';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InventoryList = (props) => {
    // const [currentProps, updateProps] = useState({...props});
    const { userReservedItems, itemTable, companyInventory, selectedItem, userInventory, inventoryLink } = props.inventoryViewState;

    const [currentState, updateState] = useState([userReservedItems, 0]);
    const scrollRef = useRef();
    const previousProps = useRef(currentState);

    const NoStyleLink = styled(Link)`
        text-decoration: none;
        &:focus, &hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `
    const Inventory = styled.div`
        display: grid;
        overflow: auto;
        padding: 1em;
        max-height: 30em;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(0, 3em);
    `

    // I need to be able to pass companyItems through this function, and userReservedItems,
    // And have the route match (react-router-dom)
    const collectUserItems = () => {
        return companyInventory ?
        companyInventory.items.reduce((acc, item) => {
            if(userReservedItems.includes(item.id)){
                acc.push(item);
            }
            return acc;
        }, []) : []
    }

    const filterItems = (items) => {
        if(items.length === 0) return <p>No Items</p>;
        const output = items.reduce((acc, item, id, array) => {
            // Doesn't allow duplicates on list (ids of duplicates saved in itemTable)
            if(!acc[0][item.product]){
            acc[0][item.product] = true;
            acc.push(
                <NoStyleLink key={id} to={`${props.matchPath}/${item.id}`}>
                    <ListItem 
                        item={item}
                        handleClick={props.handleClick}
                        selected={selectedItem ? selectedItem.product : null}
                        index={(id+1).toString()}
                        key={id}
                        backgroundColor={
                            itemTable[item.product]
                                .available
                                .find(bool => bool) ? null : "rgba(255,0,0,0.4)"
                            }
                    />
                </NoStyleLink>
            )
            }
            if(array.length-1 === id){  
                acc.shift();
            }
            return acc;
        }, [{}])
        previousProps.current = userReservedItems;
        return output;
    }

    const listExport = userInventory && companyInventory && companyInventory.items && !inventoryLink ? 
        filterItems(collectUserItems()) : companyInventory && companyInventory.items ? 
        filterItems(companyInventory.items) : <p>You don't have any equipment!</p>;

        // On click we need a way of storing the scrollTop variable in useRef
        // Look into reducing the calls to updateState here
    useEffect(() => {
        previousProps.current = userReservedItems;
        updateState([userReservedItems, currentState[1]]);
    }, [previousProps.current ? previousProps.current.length : previousProps.current, currentState[1]])

    useLayoutEffect(() => {
        scrollRef.current.scrollTop = currentState[1];
    })
    
    return (
        <Inventory id={"Inventory"} ref={scrollRef} onClick={() => updateState([currentState[0], scrollRef.current.scrollTop])}>
            {listExport}
        </Inventory>
    )
}

export default InventoryList;