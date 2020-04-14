const GetInventory = async (company_id) => {
    try {
        const response =
            await fetch("http://localhost:8080/inventory-api/inventory/" + company_id, {
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

export default GetInventory;