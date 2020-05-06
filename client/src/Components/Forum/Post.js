import React from 'react';
import styled from 'styled-components';

const Post = (props) => {
    const PostWrap = styled.div`
        display: flex;
        min-width: 30em;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        flex-direction: column;
        align-content: space-between;
    `
    const PostHeader = styled.div`
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
    const P = styled.p`
        margin: 0;
        padding: .5em;
        > * {
            margin: .5em;
        }
    `
    const PostTitle = styled.h4`
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
    const PostText = styled.div`
        border: .5px solid black;
        height: 100%;
        padding: 1em;
        display: flex;
        font-size: .80em;

        > p {
            margin: 0;
        }
    `

    const dataAtt = {
        color: "white"
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
        </PostWrap> 
    )
}

export default Post;