import React from 'react';
import styled from 'styled-components';
import rubbishCan from '../../pictures/rubbishCan.png';
import { PostWrap, PostHeader, P, PostText, dataAtt } from './Post';

const Comment = (props) => {
    const CommentBody = styled(PostWrap)`
        min-width: 90%;
        max-width: 90%;
        align-self: center;
        margin: .5em 0em;
    `
    
    const CommentHeader = styled(PostHeader)`
        background-color: rgba(105, 203, 66, .5);
    `

    const DeleteComment = styled.div`
        display: flex;
        justify-content: flex-end;
        height: 100%;
        width: 100%;

        > img {
            cursor: pointer;
            width: 1em;
            padding: .5em;
        }
    `
    const { comment_username, comment_date, id } = props.comment;
    const { user } = props;

    const addDeleteOption = () => {
        if(user.username === comment_username || user.userRole.roleType === "ADMIN"){
            return (
                <DeleteComment>
                    <img src={rubbishCan} onClick={() => props.delete(id)} />
                </DeleteComment>
            )
        }
    }
    return (
        <CommentBody>
            <CommentHeader>
                <P>
                    <span style={dataAtt}>{comment_username}</span>
                </P>
                <P>
                    <span style={dataAtt}>{comment_date}</span>
                </P>
            </CommentHeader>
            <PostText>
                {props.comment.comment_txt} 
            </PostText>
            {addDeleteOption()}
        </CommentBody>
    )
}

export default Comment;