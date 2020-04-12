const GetUser = () => {
    fetch("http://localhost:8080/users-api/user/retrieve", {
        method: 'get',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(res => res.json())
        .then(res => {
            // returns user by jwt
            return res;
        })
        .catch(err => {
            console.log("Error in GetUser ", err);
        })
}

export default GetUser;