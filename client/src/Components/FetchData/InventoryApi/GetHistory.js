const GetHistory = async (inventory_id) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/inventory-api/item-history/list/" + inventory_id, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                }   
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in GetInventory: ", error);
    }
}

export default GetHistory;