const CreateCompany = async (name, password, type, jwt) => {
    try {
        const response = 
            await fetch("http://localhost:8080/users-api/company/create", {
                method: 'post',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + jwt
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    type: type
                })
            })
        if(response.status === 500){
            alert("Company name already exists!")
            return 500;
        }
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in CreateCompany: ", error);
    }
}

export default CreateCompany;