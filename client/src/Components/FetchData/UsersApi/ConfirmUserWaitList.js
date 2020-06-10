const ConfirmUserWaitList = async (waitListId, userId, jwt) => {
    const response =
        await fetch(`http://3.235.182.140:8080/users-api/wait-list/verify/${waitListId}/${userId}`, {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + jwt
            }
        })
    const data = await response.json();
    console.log(data, "DATA IN CONFIRM USER WAITLIST")
    return data;
}

export default ConfirmUserWaitList;