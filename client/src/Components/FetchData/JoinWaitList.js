
const JoinWaitList = (id) => {
    fetch("http://localhost:8080/users-api/wait-list/join/" + id, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res, " Waitlist");
        })
}

export default JoinWaitList;