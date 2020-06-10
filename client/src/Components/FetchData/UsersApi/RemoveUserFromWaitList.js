const RemoveUserFromWaitList = async (id, jwt) => {
    const response =
        await fetch("http://3.235.182.140:8080/users-api/wait-list/remove-user/" + id, {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + jwt
            }
        })
    const data = await response.json();
    return data;
}

export default RemoveUserFromWaitList;