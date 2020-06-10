const GetWaitList = async (jwt) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/users-api/wait-list/by-user", {
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

export default GetWaitList;