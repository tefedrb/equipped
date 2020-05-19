import React from 'react';
import styled from 'styled-components';

const Category = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.parentProps.selected === props.parentProps.category ? '#69cb42' : 'rgba(0,0,0,0.4)'};
    border: 2px black solid;
    grid-column: 1 / 2;
    grid-row: ${props => props.index} / span 1;
    cursor: pointer;
    transition: all .2s linear;
    padding: 10px
    font-family: ${props => props.theme.fontFam}
    color: ${props => props.theme.color}

    &:active {
        background-color: #69cb42;
    }

    &:hover {
        background-color: ${props => props.parentProps.selected === props.parentProps.category ? '#69cb42' : 'rgba(0,0,0,0.6)'};
        color: white;
    }
`

const CategoryItem = (props) => {
    return (
        <Category
            parentProps={props}
            onClick={() => {
                props.categoryListGen();
                props.clickFunc();
                props.onClick();
            }}>
            <span>{props.category.toUpperCase()}</span>
        </Category>
    )
}

export default CategoryItem;