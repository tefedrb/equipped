const PostItemToInventory = async (itemId, inventoryId) => {
    try {
        console.log(typeof inventoryId, "< INVENTORY ID TYPE");
        console.log(typeof itemId, " < type of itemID");
        const response =
            await fetch("http://3.235.182.140:8080/inventory-api/inventory/add", {
                method: 'post',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    serial_id: itemId,
                    inventory_id: inventoryId
                })   
            })
        const data = await response.json();
        console.log(data, "<in add item to inventory")
        return data;
    } catch (error) {
        console.log("Error in AddToInventory: ", error);
    }
}

export default PostItemToInventory;