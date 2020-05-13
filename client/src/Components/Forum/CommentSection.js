import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GetCommentsByPostId from '../FetchData/UsersApi/GetCommentsByPostId';
import addButton from '../../pictures/addButton.png'
import Comment from './Comment';

const CommentSectionWrap = styled.div`
    > div {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    > div img {
        cursor: pointer;
        width: 1em;
        padding: .5em;
    }
`

const Comments = styled.section`
    max-height: 20em;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const AddComment = styled.section`
    height: 5em;
    background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextArea = styled.textarea`
    height: 100%;
    max-height: 4em;
    width: 100%;
    max-width: 500px;
`

const CommentSection = (props) => {
    const [comments, updateComments] = useState([]);
  
    useEffect(() => {
        let _isCancelled = false;

        if(props.commentsDisplay){
           GetCommentsByPostId(props.postId)
                .then(res => {
                    if(!_isCancelled){
                        updateComments(res);
                    }
                }); 
        }
        return () => {
            _isCancelled = true;
        }
    }, [props.commentsDisplay])

    const collectComments = comments.length >= 1 ? comments.map((comment, idx) => 
        <Comment comment={comment} key={idx} />
    ) : "No Comments";

    return (
        <CommentSectionWrap>
            <div>
                <img 
                    style={{display: props.commentsDisplay ? "block" : "none"}} 
                    alt={"add comment"} src={addButton}
                />
            </div>
            <AddComment>
                <TextArea>

                </TextArea>
            </AddComment>
            <Comments>
                {props.commentsDisplay ? collectComments : ""}
            </Comments>
        </CommentSectionWrap>
    )
}

export default CommentSection;