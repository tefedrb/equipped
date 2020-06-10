const GetUser = async (jwt) => {
    try {
        const response =
            await fetch("http://3.235.182.140:8080/users-api/user/retrieve", {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt
                }
            })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in GetUser: ", error);
    }
}

export default GetUser;