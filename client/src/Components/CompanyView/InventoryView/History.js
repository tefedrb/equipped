import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import GetHistory from '../../FetchData/InventoryApi/GetHistory';

const History = (props) => {
    const [ history, updateHistory ] = useState([]);
    const { companyInventory } = props.userContext.state;

    const checkNewHistory = (history, returnedHistory) => {
        return history.some((history, idx) => {
            // Return true if...
            return returnedHistory[idx].id !== history.id ? true :
            returnedHistory[idx].reserve_date !== history.reserve_date ? true :
            returnedHistory[idx].return_date !== history.return_date ? true :
            false
        })
    }

    useEffect(() => {
        let _isCancelled = false;
        if(companyInventory && companyInventory.id && !_isCancelled){
            GetHistory(companyInventory.id).then(res => {
                console.log(res,"eh")
                if(checkNewHistory(history, res)){
                    updateHistory(res);
                    console.log(companyInventory, "inventory history");
                    
                }
            })
           
        }
        return () => {
            _isCancelled = true;
        }
    }, [companyInventory, history]);

    const pullItemInfo = () => {

    }

    // Order history by earliest to last
    // For each item - productName - 
    console.log(history, "HISTORY")
    return (
        <>
            
        </>
    )
}

export default History;