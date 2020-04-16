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
            console.log(res);
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
            return () => {
                isCancelled = true;
            };
        }
    })  

    const Wrapper = styled.section`
        display: flex;
        justify-content: center;
        background-color: rgba(255,255,255,0.4);
        margin: 3%;
    ` 
    const GridContainer = styled.div`
        display: grid;
        overflow: auto;
        flex-grow: 1;
        max-height: 30em;
        grid-template-columns: repeat(3, 1fr) 4fr;
        grid-template-rows: repeat(${equipment.mainCategories ? equipment.mainCategories.length : 0}, 3em);
    `

    const categoryItems = equipment.mainCategories ? equipment.mainCategories.map((category, id)=> {
        return <CategoryItem 
                    clickFunc={getAllSubCategoryNames}
                    multiplier={equipment.mainCategories.length} 
                    category={category} 
                    key={id}
                    index={(id+1).toString()}
                />
    }) : null;

    // const subCategoryItems = equipment.subCategories ? equipment.subCategories.map((subCat, id ) => {
    //     return <CategoryItem 
    //                 clickFunc={null}
    //                 multipler={equipment.subCategories.length}
    //             />
    // })

    return (
        <Wrapper id={"wrapper"}>
            <GridContainer>
                {categoryItems}

            </GridContainer>
        </Wrapper>
    )
}

export default EquipmentView;