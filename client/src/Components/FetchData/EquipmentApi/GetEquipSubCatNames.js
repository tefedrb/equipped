const GetEquipSubCatNames = async (id) => {
    try {
        const response =
            await fetch("http://localhost:8080/equipment-api/sub-category/list-by-category-id/" + id, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                },
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in GetEquipSubCatNames: ", error);
    }
}

export default GetEquipSubCatNames;