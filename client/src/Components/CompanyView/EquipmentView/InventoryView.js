import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GetInventory from '../../FetchData/InventoryApi/GetInventory';
import ListItem from '../EquipmentView/ListItem';

const InventoryView = () => {
    const [inventory, adjustInventory] = useState({});
    let isCancelled = false;
    const companyId = JSON.parse(localStorage.getItem("userCompany")).id;

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
        grid-template-rows: repeat(${inventory.inventory ? inventory.inventory.items.length : 0}, 3em);
    `
    useEffect(() => {
        if(!inventory.inventory){
            try {
                const setCompanyInventory = async () => {
                    const response = await GetInventory(companyId);
                    if(!isCancelled){
                        adjustInventory(prevState => {
                            return {
                                ...prevState,
                                inventory: response
                            }
                        });
                        localStorage.setItem('companyInventory', JSON.stringify(response));
                        console.log(response, "< company inventory");
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
    })

    const handleClick = (item) => {
        adjustInventory(prevState => {
           return {
                ...prevState,
                selectedItem: item
            }
        });
        console.log(inventory, "< inventory");
    }

    const itemsList = inventory.inventory ? inventory.inventory.items.map((item, id) => {
        return <ListItem 
                    onClick={() => handleClick(item)}
                    selected={inventory.itemSelected ? inventory.itemSelected : null}
                    category={item}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    return (
        <Wrapper>
            <Inventory>
                
            </Inventory>
        </Wrapper>
    )
}

export default InventoryView;