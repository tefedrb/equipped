import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GetCommentsByPostId from '../FetchData/UsersApi/GetCommentsByPostId';
import CreateComment from '../FetchData/UsersApi/CreateComment';
import addButton from '../../pictures/addButton.png'
import Comment from './Comment';
import hideButton from '../../pictures/hideButton.png'
// Icons made by https://www.flaticon.com/authors/freepik Freepik

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
    height: 6em;
    display: flex;
    border: 1px solid #69cb42;
    background-color: rgba(105, 203, 66, .5);
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const TextArea = styled.textarea`
    height: 100%;
    max-height: 4em;
    width: 100%;
    max-width: 500px;
`

const AddCommentBtn = styled.button`
    margin-top: 1px;
`
const CommentSection = (props) => {
    const [comments, updateComments] = useState([]);
    const [commentBox, updateCommentBox] = useState({ display: false, input: "" });
  
    const toggleCommentBoxDisplay = () => {
        updateCommentBox(prev => {
            return (
                {...prev, display: !prev.display}
            )
        });
    }

    const handleCommentSubmit = () => {
        if(commentBox.input.length > 2){
            CreateComment({ comment_txt: commentBox.input }, props.postId);
            toggleCommentBoxDisplay();
        } else {
            alert("Add more characters to your comment!")
        }
    }

    const trackUserInput = (event) => {
        event.preventDefault();
        event.persist();
        console.log(event.target.value)
        updateCommentBox(prev => {
            return (
                {...prev, input: event.target.value}
            )
        })
    }

    const displayCommentBox = () => {
        if(commentBox.display) {
            return ( 
                <AddComment>
                    <TextArea onChange={trackUserInput}/>
                    <AddCommentBtn onClick={handleCommentSubmit}>Add Comment</AddCommentBtn>
                </AddComment>
            )
        }
    }

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
    }, [props.commentsDisplay, commentBox.display])

    const collectComments = comments.length >= 1 ? comments.map((comment, idx) => 
        <Comment comment={comment} key={idx} />
    ).reverse() : "No Comments";

    return (
        <CommentSectionWrap>
            <div>
                <img alt={"toggle comment"} src={commentBox.display ? hideButton : addButton} onClick={toggleCommentBoxDisplay} />
            </div>

            {displayCommentBox()}

            <Comments>
                {props.commentsDisplay ? collectComments : ""}
            </Comments>
        </CommentSectionWrap>
    )
}

export default CommentSection;