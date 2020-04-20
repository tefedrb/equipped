import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ListItem from '../EquipmentView/ListItem';

const InventoryView = (props) => {
    const [inventoryState, adjustInventory] = useState({items: []});
    let isCancelled = false;
    const Wrapper = styled.section`
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: rgba(255,255,255,0.4);
        margin: 3%;
    `
    const Inventory = styled.div`
        display: grid;
        overflow: auto;
        padding: 2px;
        max-height: 30em;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${inventoryState.inventory ? 1 : 0}, 3em);
    `
    useEffect(() => {
            try {
                const { companyInventory } = props.userContext;
                console.log(companyInventory.items, 'items')
                const setCompanyInventory = async () => {
                    if(!isCancelled){
                        adjustInventory(prevState => {
                            return {
                                ...prevState,
                                inventory: companyInventory
                            }
                        });    
                    }
                    
                }
                setCompanyInventory();
            } catch (e){
                if(!isCancelled){
                    console.log("Error in InventoryView useEffect: ", e);
                }
            } 
        
        return () => {
            isCancelled = true;
        }
    },[props.userContext.companyInventory]);

    const handleClick = (item) => {
        adjustInventory(prevState => {
           return {
                ...prevState,
                selectedItem: item
            }
        });
    }

    const itemsList = inventoryState.inventory ? inventoryState.inventory.items.map((item, id) => {
        return <ListItem 
                    onclick={() => handleClick(item.serial_id)}
                    selected={inventoryState.itemSelected ? inventoryState.itemSelected : null}
                    category={item.product}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    const handleScrollEvent = (e) => {
        e.persist()
        console.log(e)
    }

    return (
        <Wrapper>
            <Inventory onClick={(e) => handleScrollEvent(e)}>
                {itemsList}
            </Inventory>
        </Wrapper>
    )
}

export default InventoryView;