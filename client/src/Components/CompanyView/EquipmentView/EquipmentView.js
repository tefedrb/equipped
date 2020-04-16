import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import GetAllItemsByCategory from '../../FetchData/EquipmentApi/GetEuipmentByCategory';
import GetEquipCategoryNames from '../../FetchData/EquipmentApi/GetEquipCategoryNames';
import GetEquipSubCatNames from '../../FetchData/EquipmentApi/GetEquipSubCatNames';

const EquipmentView = (props) => { 
    const [equipment, adjustEquipment] = useState({});
    let isCancelled = false;

    const getAllItemsByCategory = async (name) => {
        await GetAllItemsByCategory(name).then(res => {
            console.log(res, "HERE");
        })
    }

    const getAllSubCategoryNames = async (categoryName) => {
        await GetEquipSubCatNames(categoryName).then(res => {
            // console.log(res);
            const subCategoryNames = res.map(subCat => subCat.name);
            // console.log(subCategoryNames);
            if(!isCancelled){
                adjustEquipment(prevState => {
                    return {
                                ...prevState,
                                subCategories: [...subCategoryNames]
                           }
                })
            }
        })
    }
    
    useEffect(() => {
        if(!equipment.mainCategories){
            try {
                async function setMainCategories(){
                    const response = await GetEquipCategoryNames();
                    const names = response.map(category => category.name);
                    if(!isCancelled){
                        adjustEquipment(prevState => {
                            return  {
                                        ...prevState,
                                        mainSelected: null,
                                        subSelected: null,
                                        mainCategories: [...names]
                                    }
                        })
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
                subSelected: category === 'sub' ? clicked : prevState.SubSelected
            }
        })
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
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${equipment.subCategories ? equipment.subCategories.length : 0}, 3em);
    `
    const categoryItems = equipment.mainCategories ? equipment.mainCategories.map((category, id)=> {
        return <CategoryItem 
                    onClick={() => handleClick('main', category)}
                    clicked={equipment.mainSelected}
                    clickFunc={getAllSubCategoryNames}
                    multiplier={equipment.mainCategories.length} 
                    category={category} 
                    key={id}
                    index={(id+1).toString()}
                />
    }) : null;

    const subCategoryItems = equipment.subCategories ? equipment.subCategories.map((subCat, id ) => {
        return <CategoryItem onClick={() => handleClick('sub', subCat)}
                    clicked={equipment.subSelected}
                    clickFunc={null}
                    multipler={equipment.subCategories.length}
                    category={subCat}
                    index={(id+1).toString()}
                    key={id}
                />
    }) : null

    // Wrap a gridContainer around subCategory items? to keep things in the middle - use flexbox?

    return (
        <Wrapper id={"wrapper"}>
            <MainCatContainer>
                {categoryItems}
            </MainCatContainer>
            <SubCatContainer>
                {subCategoryItems}
            </SubCatContainer>
        </Wrapper>
    )
}

export default EquipmentView;