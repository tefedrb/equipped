const CreatePost = async (post) => {
    try {
        const response = 
            await fetch("http://localhost:8080/users-api/posts/create-post", {
                method: 'post',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
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