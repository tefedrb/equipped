import React from 'react';
import ListItem from '../ListItem';
import { Route, Link } from 'react-router-dom';

const InventoryList = (props) => {
    const { userItems, itemTable, companyInventory, matchPath, selectedItem, handleClick } = props;

    const NoStyleLink = styled(Link)`
        text-decoration: none;
        &:focus, &hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `
    const collectUserItems = (items) => {
        return items.reduce((acc, item, id, array) => {
            // Doesn't allow duplicates on list (ids of duplicates saved in itemTable)
            if(!acc[0][item.product]){
            acc[0][item.product] = true;
            acc.push(
                <NoStyleLink key={id} to={`${matchPath}/${item.id}`}>
                    <ListItem 
                        item={item}
                        handleClick={this.handleClick}
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
        },[{}])
    }

    return (
        <>
        </>
    )
}

export default InventoryList;