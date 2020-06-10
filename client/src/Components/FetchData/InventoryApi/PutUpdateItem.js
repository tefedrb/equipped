const PutUpdateItem = async (user, availability, id) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/inventory-api/items/update-item", {
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
        return data;
    } catch (error) {
        console.log("Error in AddToInventory: ", error);
    }
}

export default PutUpdateItem;