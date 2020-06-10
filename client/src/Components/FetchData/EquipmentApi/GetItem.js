const GetItem = async () => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/equipment-api/item/" + 1, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        const data = await response.json();       
        return data;
    } catch (error) {
        console.log("Error in GetEquipCatNames: ", error);
    }
}

export default GetItem;