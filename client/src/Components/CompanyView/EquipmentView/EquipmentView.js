import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import GetAllItemsByCategory from '../../FetchData/EquipmentApi/GetEuipmentByCategory';
import GetEquipCategoryNames from '../../FetchData/EquipmentApi/GetEquipCategoryNames';
import GetEquipSubCatNames from '../../FetchData/EquipmentApi/GetEquipSubCatNames';
import GetEquipBySubCategory from '../../FetchData/EquipmentApi/GetEquipBySubCategory';
import GetAllItems from '../../FetchData/EquipmentApi/GetAllItems';
import ItemView from '../EquipmentView/ItemView';
import SubCatItem from '../EquipmentView/SubCatItem';
import GearItemButton from '../GearItemButton';
import { UserConsumer } from '../../UserContext';
import MiddleViewWrapper from '../../MiddleViewWrapper';

/* Notes: 
    1. Might want to switch to a local look up of items for better performance.
    2. Need to all user to search for particular items via a search bar
    3. (Done) Users should be able to click on the main category button and have 
       subcategory items unchecked
*/ 
class EquipmentView extends React.Component {
    _isCancelled = false 
    constructor(props){
        super(props);
        this.scrollRef = React.createRef();
        this.state = {
            equipment: {},
            allItems: null,
            listScroll: 0
        }
    }

    componentDidMount(){
        if(!this.state.mainCategories){
            this.setMainCategories();
            // Method below follows a client-side query paradigm
            // this.setAllItems();
        }
    }

    componentDidUpdate(){
        this.scrollRef.current.scrollTop = this.state.listScroll;
    }
    
    componentWillUnmount(){
        this._isCancelled = true;
    }

    setAllItems = async () => {
        await GetAllItems().then(items => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    allItems: items
                }
            })
        })
    }
    
    setMainCategories = async () => {
        try {
            const response = await GetEquipCategoryNames();
            if(!this._isCancelled){
                this.setState(prevState => {
                    return  {
                        ...prevState,
                        mainSelected: null,
                        subSelected: null,
                        itemSelected: null,
                        mainCategories: response
                    }
                });
            }
        } catch(e){
            if(!this._isCancelled){
                console.log("Error in EquipmentView useEffect: ", e);
            }
        }
    }

    getAllItemsByCategory = async (name) => {
        if(name){
            await GetAllItemsByCategory(name).then(res => {
                const allItemsByCat = res;
                if(!this._isCancelled){
                    this.setState(prevState => {
                        return {    
                            ...prevState,
                            allItemsByCat: allItemsByCat,
                            itemsBySelectedCat: allItemsByCat 
                        }
                    });
                    console.log(allItemsByCat, "< allItems")
                }
            })
        } else {
            return null;
        }
    }

    //PART OF THE CLIENT SIDE QUERY PARADIGM
    getAllItemsByCategoryLocal = (name) => {
        const { allItems } = this.state;
        const itemsByCategory = allItems.filter(item => {
            return item.category.name === name;
        })
        this.setState(prevState => {
            return {
                ...prevState,
                allItemsByCat: itemsByCategory,
                itemsBySelectedCat: itemsByCategory
            }
        })
        // return itemsByCategory;
    }

    getAllItemsBySubCategory = async (id) => {
        await GetEquipBySubCategory(id).then(res => {
            const allItemsBySubCat = res;
            console.log(res, "< sub cat items RESPONSE")
            if(!this._isCancelled){
                this.setState(prevState => {
                    return {
                        ...prevState,
                        itemsBySelectedCat: allItemsBySubCat
                    }
                })
            }
        })
    }

    getAllSubCategoryNames = async (id) => {
        await GetEquipSubCatNames(id).then(res => {
            if(!this._isCancelled){
                this.setState(prevState => {
                    return {
                                ...prevState,
                                subCategories: res
                           }
                });
            }
        })
    }

    handleClick = (clicked, category) => {
        this.setState(prevState => {
           return {
                ...prevState,
                mainSelected: category === 'main' ? clicked : prevState.mainSelected,
                subSelected: category === 'sub' || category === 'main' ? clicked : prevState.subSelected,
                itemSelected: category === 'item' ? clicked : prevState.itemSelected,
                listScroll: this.scrollRef.current.scrollTop
            }
        });
    }

    render(){
        const {
                itemsBySelectedCat, subCategories, mainCategories, 
                itemSelected, mainSelected, subSelected
                } = this.state;

        const MainCatContainer = styled.div`
            display: grid;
            overflow: auto;
            padding: 2px;
            max-height: 30em;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(${mainCategories ? mainCategories.length : 0}, 3em);
        `
        const SubCatContainer = styled(MainCatContainer)`
            grid-template-rows: repeat(${subCategories ? subCategories.length : 0}, 3em);
        `

        const ItemListContainer = styled(MainCatContainer)`
            grid-template-rows: repeat(${itemsBySelectedCat ? itemsBySelectedCat.length : 0}, 3em);
        `
        const mainCategory = mainCategories ? mainCategories.map((categoryObj, id)=> {
            const categoryName = categoryObj.name;
            return <CategoryItem 
                        categoryListGen={() => this.getAllItemsByCategory(categoryName)}
                        onClick={() => this.handleClick(categoryName, 'main')}
                        selected={mainSelected}
                        clickFunc={() => this.getAllSubCategoryNames(categoryObj.id)}
                        category={categoryName} 
                        index={(id+1).toString()}
                        key={id}
                    />
        }) : null;
    
        const subCategoryItems = subCategories ? subCategories.map((subCat, id ) => {
            return <SubCatItem 
                        onClick={() => this.handleClick(subCat.name, 'sub')}
                        selected={subSelected}
                        // Swap this from equipment-api search to local search
                        subCategoryListGen={() => this.getAllItemsBySubCategory(subCat.id)}
                        category={subCat.name}
                        index={(id+1).toString()}
                        key={id}
                    />
        }) : null;
    
        const itemsList = itemsBySelectedCat ? itemsBySelectedCat.map((item, id) => {
            return <GearItemButton 
                        handleClick={this.handleClick}
                        item={item}
                        listCategory={'item'}
                        selected={itemSelected ? itemSelected.product : null}
                        index={(id+1).toString()}
                        key={id}
                    />
        }) : null;

        return (
            <MiddleViewWrapper id={"equipment-wrapper"}>
                <MainCatContainer>
                    {mainCategory}
                </MainCatContainer>
                <SubCatContainer>
                    {subCategoryItems}
                </SubCatContainer>
                <ItemListContainer ref={this.scrollRef}>
                    {itemsList}
                </ItemListContainer>
                <UserConsumer>
                    { value => 
                        <ItemView 
                            id={"ItemView"} 
                            itemSelected={itemSelected} 
                            userContext={value.state} 
                        />
                    }
                </UserConsumer>
            </MiddleViewWrapper>
        );
    }
}

export default EquipmentView;