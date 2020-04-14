import React, {useState} from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const EquipmentView = (props) => { 
    const [mainCategory, gatherCategories] = useState(["camera", "grip", "lighting", "sound"]);  
    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        background-color: rgba(255,255,255,0.4);
        margin: 3%;
    ` 
    const GridContainer = styled.div`
        flex-grow: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr) 4fr;
        max-height: 30em;
        grid-template-rows: repeat(${mainCategory.length}, 4em);
    `
    console.log(mainCategory.length, "< MAIN CAT LENGH")
    const categoryItems = mainCategory ? mainCategory.map((category, id)=> {
        console.log(id);
        return <CategoryItem 
                    multiplier={mainCategory.length} 
                    category={category} 
                    key={id}
                    index={(id+1).toString()}
                />
    }) : null;

    return (
        <Wrapper>
            <GridContainer>
                {categoryItems}
            </GridContainer>
        </Wrapper>
    )
}

export default EquipmentView;