const UpdateUserRole = async (userRole) => {
    const response =
        await fetch("http://localhost:8080/users-api/user-role/update", {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify(userRole)
        })
    const data = await response.json();
    return data;
}

export default UpdateUserRole;