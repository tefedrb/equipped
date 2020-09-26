const GetCompanyList = async (id) => {
    try {
        const response = 
            await fetch("http://localhost:8080/users-api/posts/list/" + id, {
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