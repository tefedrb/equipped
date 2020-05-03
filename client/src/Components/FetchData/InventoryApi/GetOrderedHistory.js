const GetOrderedHistory = async (inventoryId) => {
    try {
        const response =
            await fetch("http://localhost:8080/inventory-api/item-history/list-50-order/" + inventoryId, {
                method: 'get',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                } 
            })
        const data = await response.json();
        console.log(data, "data from GetOrderedHistory")
        return data;
    } catch (error) {
        console.log("Error in AddToInventory: ", error);
    }
}

export default GetOrderedHistory