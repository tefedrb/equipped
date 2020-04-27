// import React, {useState, useEffect, useRef} from 'react';
import React from 'react';
import styled from 'styled-components';
import ListItem from '../ListItem';
import {Route, Link} from 'react-router-dom';
import InventoryItem from './InventoryItem';
import InventoryOverview from './InventoryOverview';
import PutUpdateItem from '../../FetchData/InventoryApi/PutUpdateItem'
import {UserConsumer} from '../../UserContext';
import History from './History';

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
    padding: 1em;
    max-height: 30em;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(0, 3em);
`
const NoItems = styled.div`
    flex-grow: 1;
    padding: 3em;
`
const NoStyleLink = styled(Link)`
    text-decoration: none;
    &:focus, &hover, &:visited, &:link, &:active{
        text-decoration: none;
    }
`

const NoItemsMsg = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
`

const Stats = styled.div`
    flex-grow: 1;
    align-items: center;
    flex-direction: column;
    padding: .2em;
`

class InventoryView extends React.Component{
    isCancelled = false;
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = { 
            companyInventory: null,
            inventoryScroll: 0,
            selectedItem: null,
            itemTable: null
        }
    }

   componentDidMount(){
        this.setCompanyInventory();
   }
   
    setCompanyInventory = () => {
        if(this.props.userContext){
        const { companyInventory } = this.props.userContext
        const itemTable = companyInventory && companyInventory.items ? companyInventory.items.reduce((acc, item) => {
            if(acc[item.product]){ 
                acc[item.product].iterations.push(item.id)
                acc[item.product].available.push(item.available)
            }
            else { 
                acc[item.product] = {"iterations":[item.id], "available": [item.available]};
            }
            return acc;
        }, {}) : null;

            if(!this.isCancelled){
                this.setState(prevState => {
                    return {
                        ...prevState,
                        companyInventory: companyInventory,
                        itemTable: itemTable
                    }
                })
            }
        }
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }
   
    componentDidUpdate(prevProps){
        this.myRef.current.scrollTop = this.state.inventoryScroll
        if(prevProps !== this.props){
            this.setCompanyInventory();
        }
    }

    reserveItem = async (user, id) => {
        await PutUpdateItem(user, false, id);
        await this.props.refreshInventory(this.props.userContext.userCompany.id);
    }

    returnItem = async (user, id) => {
        await PutUpdateItem(user, true, id);
        await this.props.refreshInventory(this.props.userContext.userCompany.id);
    }

    handleClick = (id) => {
        this.setState(prevState => {
           return {
                ...prevState,
                selectedItem: id,
                inventoryScroll: this.myRef.current.scrollTop
            }
        });
    }

    render(){
        const {selectedItem, companyInventory, user} = this.state;
        const itemsList = companyInventory && companyInventory.items.length > 0 ? 
            companyInventory.items.reduce((acc, item, id, array) => {
                // Doesn't allow duplicates on list (ids of duplicates saved in itemTable)
                if(!acc[0][item.product]){
                acc[0][item.product] = true;
                acc.push(
                    <NoStyleLink key={id} to={`${this.props.match.path}/${item.id}`}>
                        <ListItem 
                            item={item}
                            handleClick={this.handleClick}
                            selected={selectedItem ? selectedItem.product : null}
                            index={(id+1).toString()}
                            key={id}
                            backgroundColor={
                                this.state.itemTable[item.product]
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
            },[{}]) : <NoItems>NO ITEMS IN INVENTORY</NoItems>;

        return (
            <Wrapper id={"inventory-wrap"}>
                <Inventory id={"inventory"} ref={this.myRef}>
                    {itemsList}
                </Inventory>

                <UserConsumer>
                    { context => 
                        <History userContext={context} />
                    }
                </UserConsumer>
                    
                <InventoryOverview>
                    { companyInventory && selectedItem ?
                        <Route 
                            path={`${this.props.match.path}/:itemId`} 
                            render={({match}) => 
                                    <InventoryItem
                                        reserveItem={this.reserveItem}
                                        returnItem={this.returnItem}
                                        userName={user.username}
                                        itemTable={this.state.itemTable[selectedItem.product]} 
                                        selectedItem={
                                            companyInventory
                                            .items
                                            .find(item => match.params.itemId === item.id.toString())}
                                    />
                                } 
                        /> : <NoItemsMsg>Use the Equipment section to find your equipment and build you inventory!</NoItemsMsg>
                    
                    }
                </InventoryOverview>
            </Wrapper>
        );
    }
}

export default InventoryView;