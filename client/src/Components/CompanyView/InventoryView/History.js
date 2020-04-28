import React, {useEffect, useState} from 'react';
import GetHistory from '../../FetchData/InventoryApi/GetHistory';

const History = (props) => {
    let _isCancelled = false;
    const [history, updateHistory] = useState([]);
    const {companyInventory} = props.userContext.state;

    const checkReturnedHistory = (history, returnedHistory) => {
        console.log("CHECKING HISTORY...")
        return history.some((history, idx) => {
            // Return true if...
            return returnedHistory[idx].id !== history.id ? true :
            returnedHistory[idx].reserve_date !== history.reserve_date ? true :
            returnedHistory[idx].return_date !== history.return_date ? true :
            false
        })
    }

    useEffect(() => {
        if(companyInventory && companyInventory.id && !_isCancelled){
            GetHistory(companyInventory.id).then(res => {
                console.log(res, "HISTORY!!")
                if(checkReturnedHistory(history, res)){
                    updateHistory(res);
                }
            })
            
        }
        return () => {
            _isCancelled = true;
        }
    },[companyInventory, history]);

    return (
        <>
            
            
        </>
    )
}

export default History;