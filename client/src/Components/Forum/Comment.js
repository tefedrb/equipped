import React from 'react';
import styled from 'styled-components';
import {PostWrap, PostHeader, P, PostText, dataAtt} from './Post';

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

    return (
        <CommentBody>
            <CommentHeader>
                <P>
                    <span style={dataAtt}>{props.comment.comment_username}</span>
                </P>
                <P>
                    <span style={dataAtt}>{props.comment.comment_date}</span>
                </P>
            </CommentHeader>
            <PostText>
                {props.comment.comment_txt} 
            </PostText>
        </CommentBody>
    )
}

export default Comment;