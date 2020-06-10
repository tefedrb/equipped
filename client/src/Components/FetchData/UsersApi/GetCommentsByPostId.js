const GetCommentsByPostId = async (post_id) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/comments/list-by-post/" + post_id, {
                method: 'get',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                }
            })
        const data = await response.json();
        console.log(data, "data in getCommentsByPostId")
        return data    
    } catch (error) {
        console.log("Error in GetCommentsByPostId: ", error);
    }
}

export default GetCommentsByPostId;