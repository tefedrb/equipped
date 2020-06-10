const GetUserCompany = async (jwt) => {
    try { 
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/company/user-company", {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt,
                }
            })
        const userCompany = await response.json();
        return userCompany;
    } catch (error){
        console.log("Error in GetUserCompany: ", error)
    }
}

export default GetUserCompany;