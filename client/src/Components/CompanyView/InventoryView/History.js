import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import styled from 'styled-components';
import GetOrderedHistory from '../../FetchData/InventoryApi/GetOrderedHistory';

const History = (props) => {
    const [ history, updateHistory ] = useState([]);
    const { companyInventory } = props.userContext.state;

    const HistoryWrap = styled.div`
        display: flex;
        flex-direction: column;
        max-height: 30em;
        scrollbar-width: thin;
    `

    const ItemsWrapper = styled.div`
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 1em;
    `

    const HistoryHeader = styled.h4`
        background-color: black;
        color: white;
        padding: .5em 0;
        font-weight: 400;
        margin: 0;
        padding: .5em 0;
    `

    const historyIsNew = (prevHistory, returnedHistory) => {
        if(returnedHistory.length === 0){
            return false;
        } else if(history.length === 0){
            return true;
        } else {            
            const holdVal = prevHistory.some((prev, idx) => {
                // Return true if...
                return returnedHistory[idx].id !== prev.id ? true :
                returnedHistory[idx].reserve_date !== prev.reserve_date ? true :
                returnedHistory[idx].return_date !== prev.return_date ? true :
                false
            })
            return holdVal
        }
    }

    useEffect(() => {
        let _isCancelled = false;
        if(companyInventory && companyInventory.id && !_isCancelled){
            GetOrderedHistory(companyInventory.id).then(res => {
                if(historyIsNew(history, res)){
                    updateHistory(res);
                }
            })
           
        }
        return () => {
            _isCancelled = true;
        }
    }, [companyInventory, history]);

    const historyItems = history.length >= 1 ? history.map((item, key) => {
        return <HistoryItem item={item} key={key} />
    }) : "No History"

    return (
        <HistoryWrap>
            <HistoryHeader>
                Item History
            </HistoryHeader>
            <ItemsWrapper id={"History Wrap"}>
                {historyItems}
            </ItemsWrapper>
        </HistoryWrap>
    )
}

export default History;