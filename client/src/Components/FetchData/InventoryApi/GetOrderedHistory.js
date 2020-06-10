const GetOrderedHistory = async (inventoryId) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/inventory-api/item-history/list-50-order/" + inventoryId, {
                method: 'get',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                } 
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in AddToInventory: ", error);
    }
}

export default GetOrderedHistory