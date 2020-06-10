const GetCompanyList = async (jwt) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/company/list", {
                method: 'get',
                headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
        const data = await response.json();
        return data;
    } catch (error){
        console.log("Error in GetCompanyList ", error);
    }
}

export default GetCompanyList;