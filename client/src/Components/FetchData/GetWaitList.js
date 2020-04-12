const GetWaitList = () => {
    fetch("http://localhost:8080/users-api/wait-list/by-user", {
        method: 'get',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(res => res.json())
        .then(res => {
            // Get wait list of by jwt
            return res; 
        })
        .catch(error => 
            console.log("Error in checkForWaitList ", error)
        )
}

export default GetWaitList;