async function GetUserCompany(){
    const response = 
        await fetch("http://localhost:8080/users-api/company/user-company", {
            method: 'get',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        // .catch(error => 
        //         console.log("Can't find user compnay: ", error)
        //     );
    console.log(response, "< response from getusercomp")
    const data = await response.json();    
    return data;
}

export default GetUserCompany;