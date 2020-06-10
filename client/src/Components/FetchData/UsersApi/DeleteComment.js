const DeleteComment = async (comment_id) => {
    try {
        const response = 
            await fetch("http://3.235.182.140:8080/users-api/comments/delete/" + comment_id, {
                method: 'delete',
                headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
        const data = await response.json();
        return data    
    } catch (error) {
        console.log("Error in DeleteComment: ", error);
    }
}

export default DeleteComment;