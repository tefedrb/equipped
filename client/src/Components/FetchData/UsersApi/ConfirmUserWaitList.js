const ConfirmUserWaitList = async (waitListId, userId) => {
    const response =
        await fetch(`http://localhost:8080/users-api/wait-list/${waitListId}/${userId}`, {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            }
        })
    const data = await response.json();
    return data;
}

export default ConfirmUserWaitList;