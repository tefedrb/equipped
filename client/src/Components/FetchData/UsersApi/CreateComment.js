const CreateComment = async (comment, post_id) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/comments/create-comment/" + post_id, {
                method: 'post',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(comment)
            })
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in CreateComment: ", error);
    }
}

export default CreateComment;