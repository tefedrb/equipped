import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ListItem from '../EquipmentView/ListItem';

const InventoryView = (props) => {
    const [inventory, adjustInventory] = useState({});
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
        grid-template-rows: repeat(${inventory.inventory ? 1 : 0}, 3em);
    `
    useEffect(() => {
        if(!inventory.inventory && props.userContext.userCompany){
            try {
                // SET INVENTORY VIA CONTEXT API
                const { userCompany } = props.userContext;
                console.log(userCompany.items, 'items')
                const setCompanyInventory = async () => {
                    if(!isCancelled){
                        adjustInventory(prevState => {
                            return {
                                ...prevState,
                                inventory: userCompany.items
                            }
                        });
                        // localStorage.setItem('companyInventory', JSON.stringify(response));
                        // console.log(response, "< company inventory");
                    }
                    
                }
                setCompanyInventory();
            } catch (e){
                if(!isCancelled){
                    console.log("Error in InventoryView useEffect: ", e);
                }
            } 
        }
        return () => {
            isCancelled = true;
        }
    },[inventory])

    const handleClick = (item) => {
        adjustInventory(prevState => {
           return {
                ...prevState,
                selectedItem: item
            }
        });
        console.log(inventory, "< inventory");
    }

    const itemsList = inventory.inventory ? inventory.inventory.map((item, id) => {
        return <ListItem 
                    onClick={() => handleClick(item.serial_id)}
                    selected={inventory.itemSelected ? inventory.itemSelected : null}
                    category={item.product}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    return (
        <Wrapper>
            <Inventory>
                {itemsList}
            </Inventory>
        </Wrapper>
    )
}

export default InventoryView;