import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import GetHistory from '../../FetchData/InventoryApi/GetHistory';

const History = (props) => {
    const [ history, updateHistory ] = useState([]);
    const { companyInventory } = props.userContext.state;

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
            GetHistory(companyInventory.id).then(res => {
                if(historyIsNew(history, res)){
                    updateHistory(res);
                }
            })
           
        }
        return () => {
            _isCancelled = true;
        }
    }, [companyInventory, history]);

    const pullItemInfo = () => {
        // For each item check if history is related
    }
    // Order history by earliest to latest by history id
    // For each item - productName
    
    return (
        <>
            
        </>
    )
}

export default History;