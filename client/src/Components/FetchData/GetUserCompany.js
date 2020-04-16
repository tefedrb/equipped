const GetUserCompany = async (jwt, controller) => {
    try { 
        const control = controller ? controller : null;
        const response = 
            await fetch("http://localhost:8080/users-api/company/user-company", {
                method: 'get',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt,
                },
                signal: control
            })
        const data = await response.json();
        return data;
    } catch (error){
        console.log("Error in GetUserCompany: ", error)
    }
}

export default GetUserCompany;