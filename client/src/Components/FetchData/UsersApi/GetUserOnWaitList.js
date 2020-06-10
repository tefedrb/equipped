const GetUserOnWaitList = async (username, jwt) => {
    try { 
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/wait-list/retrieve/"+ username, {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt
                }
            })
        const userCompany = await response.json();
        return userCompany;
    } catch (error){
        console.log("Error in GetUserOnWaitList ", error)
    }
}

export default GetUserOnWaitList;