const GetCompanyUsersList = async (jwt) => {
    try { 
        const response = 
            await fetch("http://localhost:8080/users-api/company/list-users", {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt,
                }
            })
        const userCompany = await response.json();
        return userCompany;
    } catch (error){
        console.log("Error in GetCompanyUsersList: ", error)
    }
}

export default GetCompanyUsersList;