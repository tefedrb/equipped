// import React, {useState, useEffect, useRef} from 'react';
import React from 'react';
import styled from 'styled-components';
import ListItem from '../EquipmentView/ListItem';

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

    /* 
        I am trying to get the scrollTop position of my Inventory div 
        right after I click on one of it's children.
        Then, the idea is to save that position into the state so that when
        the component has to re-render (to track the selected item/child) the
        list doesn't jump back to the top and instead mantains it's position
    */

   componentDidMount(){
        this.setCompanyInventory();
   }
   
    setCompanyInventory = () => {
        if(this.props.userContext){
        const { companyInventory } = this.props.userContext
        const itemTable = companyInventory ? companyInventory.items.reduce((acc, item) => {
            acc[item.product] ? 
            acc[item.product].push(item.id) : acc[item.product] = [item.id];
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
        const {selectedItem, companyInventory, items} = this.state;
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
            grid-template-rows: repeat(0, 3em);
        `
        /* 
            Make a hashTable like representation of the items for the list - key is name - value is array with
             the id's of each instance of the item 
        */
        const itemsList = companyInventory ? companyInventory.items.reduce((acc, item, id, array) => {
            // Doesn't allow duplicates on list (ids of duplicates saved in itemTable)
            if(!acc[0][item.product]){
            acc[0][item.product] = true; 
            acc.push(<ListItem 
                handleClick={this.handleClick}
                item={item}
                selected={selectedItem ? selectedItem.product : null}
                index={(id+1).toString()}
                key={id}
            />)
            } 
            if(array.length-1 === id){
                acc.shift();
            }
            console.log(acc[0])
            return acc;
        },[{}]) : null;
        
        return (
            <Wrapper>
                <Inventory ref={this.myRef}>
                    {itemsList}
                </Inventory>
            </Wrapper>
        );
    }
}

export default InventoryView;



// const InventoryView = (props) => {
//     const [inventoryState, adjustInventory] = useState({items: [], currentScroll: 0});
//     let isCancelled = false;
//     const Wrapper = styled.section`
//         display: flex;
//         justify-content: left;
//         align-items: center;
//         background-color: rgba(255,255,255,0.4);
//         margin: 3%;
//     `
//     const Inventory = styled.div`
//         display: grid;
//         overflow: auto;
//         padding: 2px;
//         max-height: 30em;
//         grid-template-columns: 1fr;
//         grid-template-rows: repeat(${inventoryState.inventory ? 1 : 0}, 3em);
//     `
//     Inventory.scrollTop = inventoryState.currentScroll;
//     console.log(Inventory.scrollTop, "scroll")
//     console.log(inventoryState.currentScroll)
//     console.log(Inventory.current)

//     /* 
//         I am trying to get the scrollTop position of my Inventory div 
//         right after I click on one of it's children.
//         Then, the idea is to save that position into the state so that when
//         the component has to re-render (to track the selected item/child) the
//         list doesn't jump back to the top and instead mantains it's position
//     */
//     useEffect(() => {
//             console.log("In original")
//             try {
//                 const { companyInventory } = props.userContext;
//                 console.log(companyInventory.items, 'items')
//                 const setCompanyInventory = async () => {
//                     if(!isCancelled){
//                         adjustInventory(prevState => {
//                             return {
//                                 ...prevState,
//                                 inventory: companyInventory
//                             }
//                         });    
//                     }
                    
//                 }
//                 setCompanyInventory();
//             } catch (e){
//                 if(!isCancelled){
//                     console.log("Error in InventoryView useEffect: ", e);
//                 }
//             } 
        
//         return () => {
//             isCancelled = true;
//         }
//     },[props.userContext.companyInventory]);

//     const handleClick = (item_serial, currentScroll) => {
//         adjustInventory(prevState => {
//             console.log("in here")
//            return {
//                 ...prevState,
//                 selectedItem: item_serial,
//                 currentScroll: currentScroll
//             }
//         });
//     }

//     const itemsList = inventoryState.inventory ? inventoryState.inventory.items.map((item, id) => {
//         return <ListItem 
//                     onclick={handleClick}
//                     item={item}
//                     selected={inventoryState.itemSelected ? inventoryState.itemSelected : null}
//                     category={item.product}
//                     index={(id+1).toString()}
//                     key={id}
//                 />
//     }) : null;

//     // const handleScrollEvent = (e) => {
//     //     e.persist()
//     //     // Compare keys and values between last event obj and new -> print key/value
//     //     console.log(e.scrollTop)
//     //     const element = e.target;
//     //     console.log()

//     //     // const holdVal = e;
//     //     // console.log(" \n")
//     //     // console.log(" \n")
//     //     // for(const property in e){
//     //     //     if(inventoryState.clickObj[property] === e[property] && (typeof e[property] === "number")){
//     //     //         console.log(
//     //     //             `${property}: ${inventoryState.clickObj[property]} < old `,
//     //     //             `${property}: ${e[property]} < new`
//     //     //         )
//     //     //     }
//     //     // }
//     //     // adjustInventory(prevState => {
//     //     //     return {
//     //     //         ...prevState,
//     //     //         clickObj: holdVal
//     //     //     }
//     //     // })
//     // }

//     return (
//         <Wrapper>
//             <Inventory>
//                 {itemsList}
//             </Inventory>
//         </Wrapper>
//     )
// }