import React, { useState } from 'react';
import styled from 'styled-components';
import Interface from '../../pictures/interface.png'
import CommentSection from './CommentSection';
// Icons made by https://www.flaticon.com/authors/freepik Freepik

export const PostWrap = styled.div`
    display: flex;
    min-width: 30em;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    flex-direction: column;
    align-content: space-between;
    margin: 1em;
`
export const PostHeader = styled.div`
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    justify-content: space-between;
    background-color: #69cb42;
    width: 100%;
    font-size: .80em;
    border: .5px solid black;
`
export const P = styled.p`
    margin: 0;
    padding: .5em;
    > * {
        margin: .5em;
    }
`
export const PostTitle = styled.h4`
    display: flex;
    margin: 0;
    padding: .5em;
    font-weight: 400;
    background-color: rgba(0,0,0,0.6);
    color: white;
    font-size: .85em;
    color: #69cb42;
    > * {
        margin: .2em;
    }
`
export const PostText = styled.div`
    border-top: .5px solid black;
    height: 100%;
    padding: 1em;
    display: flex;
    font-size: .80em;
    color: white;

    > p {
        margin: 0;
    }
`
const CommentSelection = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    max-height: 20em;
    border-bottom: .5px solid black;

    > img {
        cursor: pointer;
        width: 1em;
        padding: .5em;
    }
`

export const dataAtt = {
    color: "white"
}

const Post = (props) => {
    const [commentsDisplay, updateCommentsDisplay] = useState(false);

    const handleClick = () => {
        console.log(commentsDisplay)
        updateCommentsDisplay(prev => !prev);
    }

    return (
        <PostWrap>
            <PostHeader>
                <P>
                    <span>User:</span><span style={dataAtt}>{props.post.post_username}</span>
                </P>
                <P>
                    <span style={dataAtt}>{props.post.post_date}</span>
                </P>
            </PostHeader>
            <PostTitle>
                <span>Subject:</span>
                <span style={dataAtt}>{props.post.title}</span>
            </PostTitle>
            <PostText>
                <p>{props.post.post_txt}</p>
            </PostText>
            <CommentSelection>
                <img alt={"toggle comments"} src={Interface} onClick={handleClick}/>
            </CommentSelection>
            {commentsDisplay ? <CommentSection postId={props.post.id} commentsDisplay={commentsDisplay} /> : ""}
        </PostWrap> 
    )
}

export default Post;