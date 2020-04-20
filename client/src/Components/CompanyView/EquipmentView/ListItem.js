import React from 'react';
import styled from 'styled-components';


const ListItem = (props) => {
    const Category = styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props.selected === props.category ? '#69cb42' : 'rgba(0,0,0,0.4)'};
        border: 2px black solid;
        grid-column: 1 / 2;
        grid-row: ${props.index} / span 1;
        cursor: pointer;
        transition: all .2s linear;
        padding: 10px

        &:active {
            background-color: #69cb42;
        }

        &:hover {
            background-color: ${props.selected === props.category ? '#69cb42' : 'rgba(0,0,0,0.6)'};
            color: white;
        }
    `
    return (
        <Category onClick={(e) => {
                console.log(e, "E")
                props.onclick();
            }}>
            <span>{props.category}</span>
        </Category>
    )
}

export default ListItem;