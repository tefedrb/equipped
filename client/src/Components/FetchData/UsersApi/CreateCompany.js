const CreateCompany = async (name, password, type) => {
    try {
        const response = 
            await fetch("http://localhost:8080/users-api/company/create", {
                method: 'post',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    type: type
                })
            })
        if(response.status === 500){
            return alert("Company name already exists!")
        }
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in CreateCompany: ", error);
    }
}

export default CreateCompany;