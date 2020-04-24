const PutUpdateItem = async (user, availability, id) => {
    try {
        console.log(typeof inventoryId, "< INVENTORY ID TYPE");
        console.log(typeof itemId, " < type of itemID");
        const response =
            await fetch("http://localhost:8080/inventory-api/items/update-item", {
                method: 'put',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    serial_id: null,
                    product: null,
                    available: availability,
                    image: null,
                    prodLink: null,
                    value: 1,
                    category: null,
                    subCategory: null,
                    itemUser: user,
                    inventory: null,
                    inventory_id: null
                })   
            })
        const data = await response.json();
        console.log(data, "< in updateItem item to inventory")
        return data;
    } catch (error) {
        console.log("Error in AddToInventory: ", error);
    }
}

export default PutUpdateItem;