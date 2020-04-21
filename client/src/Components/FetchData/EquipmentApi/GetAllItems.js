const GetAllItems = async () => {
    try {
        const response =
            await fetch("http://localhost:8080/equipment-api/item/list", {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in GetEquipment: ", error);
    }
}

export default GetAllItems;