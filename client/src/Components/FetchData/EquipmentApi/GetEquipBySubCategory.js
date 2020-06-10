const GetEquipBySubCategory = async (id) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/equipment-api/item/list-by-sub-category-id/" + id, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        const data = await response.json();
        console.log(data, "< data in equipbysubcategory")
        return data;
    } catch (error) {
        console.log("Error in GetEquipment: ", error);
    }
}

export default GetEquipBySubCategory;