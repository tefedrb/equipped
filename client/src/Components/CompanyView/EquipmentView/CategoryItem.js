import React from 'react';
import styled from 'styled-components';


const CategoryItem = (props) => {
    const Category = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.4);
        border: 2px black solid;
        grid-column: 1 / 2;
        grid-row: ${props.index} / span 1;
        cursor: pointer;
        transition: all .2s linear;

        &:active {
            background-color: #69cb42;
        }

        &:hover {
            background-color: rgba(0,0,0,0.8);
            color: white;
        }
    `
    return (
        <Category onClick={() => props.clickFunc(props.category)}>
            <span>{props.category}</span>
        </Category>
    )
}

export default CategoryItem;