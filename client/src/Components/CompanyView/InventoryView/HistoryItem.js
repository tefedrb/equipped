import React from 'react';
import styled from 'styled-components';

const HistoryItem = (props) => {
    const ItemWrap = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: rgba(0,0,0,0.4);
        border 2px black solid;
        color: black;
        font-size: .80em;
    `
    const P = styled.p`
        margin: 0;
        padding: 0 1em;
    `

    const Span = styled.span`
        color: #69cb42;
        margin-bottom: 1em;
        padding: 0 1em;
    `

    const Returned = styled(Span)`
        color: white;
    `

    return (
        <ItemWrap>
            <P>Item Name:</P>
            <Span>{props.item.item_name}</Span>
            <P>Taken out by:</P>
            <Span>{props.item.username}</Span>
            <P>Reserve date:</P>
            <Span>{props.item.reserve_date}</Span>
            <P>Returned:</P>
            <Returned>{props.item.return_date ? props.item.return_date : "Still Out"}</Returned>
        </ItemWrap>
    )
}

export default HistoryItem;