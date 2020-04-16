import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import GetAllItemsByCategory from '../../FetchData/EquipmentApi/GetEuipmentByCategory';
import GetEquipCategoryNames from '../../FetchData/EquipmentApi/GetEquipCategoryNames';
import GetEquipSubCatNames from '../../FetchData/EquipmentApi/GetEquipSubCatNames';
import GetEquipBySubCategory from '../../FetchData/EquipmentApi/GetEquipBySubCategory';
import ItemView from '../EquipmentView/ItemView';
import SubCatItem from '../EquipmentView/SubCatItem';
import ListItem from '../EquipmentView/ListItem';

const EquipmentView = () => { 
    const [equipment, adjustEquipment] = useState({});
    let isCancelled = false;

    const getAllItemsByCategory = async (name) => {
        if(name){
            await GetAllItemsByCategory(name).then(res => {
                const allItemsByCat = res;
                if(!isCancelled){
                    adjustEquipment(prevState => {
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

    const getAllItemsBySubCategory = async (id) => {
        await GetEquipBySubCategory(id).then(res => {
            const allItemsBySubCat = res;
            console.log(res, "< sub cat items RESPONSE")
            if(!isCancelled){
                adjustEquipment(prevState => {
                    return {
                                ...prevState,
                                itemsBySelectedCat: allItemsBySubCat
                            }
                })
                console.log(allItemsBySubCat, "< sub cat items")
            }
        })
    }

    const getAllSubCategoryNames = async (id) => {
        await GetEquipSubCatNames(id).then(res => {
            // console.log(res);
            // const subCategoryNames = res.map(subCat => subCat.name);
            // console.log(subCategoryNames);
            if(!isCancelled){
                adjustEquipment(prevState => {
                    return {
                                ...prevState,
                                subCategories: res
                           }
                });
            }
        })
    }
    
    useEffect(() => {
        if(!equipment.mainCategories){
            try {
                async function setMainCategories(){
                    const response = await GetEquipCategoryNames();
                    if(!isCancelled){
                        adjustEquipment(prevState => {
                            return  {
                                        ...prevState,
                                        mainSelected: null,
                                        subSelected: null,
                                        itemSelected: null,
                                        mainCategories: response
                                    }
                        });
                    }
                } 
                setMainCategories();
            } catch (e) {
                if(!isCancelled){
                    console.log("Error in EquipmentView useEffect", e);
                }
            }
            console.log("Use effect...")
            return () => {
                isCancelled = true;
            };
        }
    })  

    const handleClick = (category, clicked) => {
        adjustEquipment(prevState => {
           return {
                ...prevState,
                mainSelected: category === 'main' ? clicked : prevState.mainSelected,
                subSelected: category === 'sub' ? clicked : prevState.subSelected,
                itemSelected: category === 'item' ? clicked : prevState.itemSelected
            }
        });
        console.log(equipment, "< Equipment");
    }

    const Wrapper = styled.section`
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: rgba(255,255,255,0.4);
        margin: 3%;
    ` 
    const MainCatContainer = styled.div`
        display: grid;
        overflow: auto;
        padding: 2px;
        max-height: 30em;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${equipment.mainCategories ? equipment.mainCategories.length : 0}, 3em);
    `
    const SubCatContainer = styled(MainCatContainer)`
        grid-template-rows: repeat(${equipment.subCategories ? equipment.subCategories.length : 0}, 3em);
    `

    const ItemListContainer = styled(MainCatContainer)`
        grid-template-rows: repeat(${equipment.itemsBySelectedCat ? equipment.itemsBySelectedCat.length : 0}, 3em);
    `

    const categoryItems = equipment.mainCategories ? equipment.mainCategories.map((categoryObj, id)=> {
        const category = categoryObj.name;
        return <CategoryItem 
                    categoryListGen={() => getAllItemsByCategory(category)}
                    onClick={() => handleClick('main', category)}
                    selected={equipment.mainSelected}
                    clickFunc={() => getAllSubCategoryNames(categoryObj.id)}
                    multiplier={equipment.mainCategories.length} 
                    category={category} 
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    const subCategoryItems = equipment.subCategories ? equipment.subCategories.map((subCat, id ) => {
        return <SubCatItem 
                    onClick={() => handleClick('sub', subCat.name)}
                    selected={equipment.subSelected}
                    // Swap this from equipment-api search to local search
                    subCategoryListGen={() => getAllItemsBySubCategory(subCat.id)}
                    multipler={equipment.subCategories.length}
                    category={subCat.name}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    const itemsList = equipment.itemsBySelectedCat ? equipment.itemsBySelectedCat.map((item, id) => {
        return <ListItem 
                    onClick={() => handleClick('item', item)}
                    selected={equipment.itemSelected ? equipment.itemSelected.product : null}
                    category={item.product}
                    multiplier={equipment.itemsBySelectedCat.length}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null;

    return (
        <Wrapper id={"wrapper"}>
            <MainCatContainer>
                {categoryItems}
            </MainCatContainer>
            <SubCatContainer>
                {subCategoryItems}
            </SubCatContainer>
            <ItemListContainer>
                {itemsList}
            </ItemListContainer>
            <ItemView id={"ItemView"} itemSelected={equipment.itemSelected} />
        </Wrapper>
    )
}

export default EquipmentView;