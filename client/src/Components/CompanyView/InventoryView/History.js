import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import GetOrderedHistory from '../../FetchData/InventoryApi/GetOrderedHistory';

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

    return (
        <>
            
        </>
    )
}

export default History;