const CreatePost = async (post) => {
    try {
        const response = 
            await fetch("http://localhost:8080/users-api/posts/create-post/", {
                method: 'get',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(post)
            })
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in CreatePost: ", error);
    }
}

export default CreatePost;