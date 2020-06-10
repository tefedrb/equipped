const DeletePost = async (post, jwt) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/posts/delete", {
                method: 'delete',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${jwt}`
                },
                body: JSON.stringify(post)
            })
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in DeletePost: ", error);
    }
}

export default DeletePost;