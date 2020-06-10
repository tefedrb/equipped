const GetCompanyByWaitList = async (id) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/company/by-wait-list/" + id, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in GetCompanyByWaitList: ", error);
    }
}

export default GetCompanyByWaitList;