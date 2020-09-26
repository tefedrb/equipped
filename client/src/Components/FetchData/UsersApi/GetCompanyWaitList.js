const GetCompanyWaitList = async (company_id, jwt) => {
    try {
        const response =
            await fetch("http://localhost:8080/users-api/wait-list/" + company_id, {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt
                }
            })
        const data = await response.json();
        return data;
    } catch (error){
        console.log("Error in GetWaitList: ", error)
    }
}

export default GetCompanyWaitList;