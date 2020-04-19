const GetUserCompany = async (jwt, getInventory) => {
    try { 
        const response = 
            await fetch("http://localhost:8080/users-api/company/user-company", {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt,
                }
            })
        const data = await response.json();
        if(getInventory){
            console.log('OK HERE WE GO....')
            const response2 = await getInventory(data.id);
            data.inventory = response2;
        }
        return data;
    } catch (error){
        console.log("Error in GetUserCompany: ", error)
    }
}

export default GetUserCompany;