const GetEquipCategoryNames = async () => {
    try {
        const response =
            await fetch("http://localhost:8080/equipment-api/category/list", {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                },
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in GetEquipCatNames: ", error);
    }
}

export default GetEquipCategoryNames;