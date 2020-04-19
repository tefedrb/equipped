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
        const userCompany = await response.json();
        if(getInventory){
            console.log('OK HERE WE GO....')
            const inventory = await getInventory(userCompany.id);
            userCompany.inventory = inventory;
            console.log(userCompany, "< adding inventory to userCompany");
        }
        return userCompany;
    } catch (error){
        console.log("Error in GetUserCompany: ", error)
    }
}

export default GetUserCompany;