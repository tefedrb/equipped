const PromoteUserToAdmin = async (id, jwt) => {
    const response =
        await fetch("http://localhost:8080/users-api/user-role/create-admin/" + id, {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + jwt
            }
        })
    const data = await response.json();
    return data;
}

export default PromoteUserToAdmin;