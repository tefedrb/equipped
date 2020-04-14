import React from 'react';
import styled from 'styled-components';


const CategoryItem = (props) => {
    const Category = styled.div`
        background-color: blue;
        grid-column: 1 / 2;
        grid-row: ${props.index} / span 1;
    `
    console.log(props.index, "< keys?")
    return (
        <Category>
            {props.category}
        </Category>
    )
}

export default CategoryItem;