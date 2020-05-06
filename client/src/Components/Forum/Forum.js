import React, {useState, useEffect} from 'react';
import {Wrapper} from '../MiddleViewWrapper';
import GetPostsByCompany from '../FetchData/UsersApi/GetPostsByCompany';
import styled from 'styled-components';
import Post from './Post';

const Forum = (props) => {
    const [posts, updatePostsAndComments] = useState();
    const { userCompany } = props.userContext.state;

    const AllPostsWrap = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    `
    const CenterForum = styled(Wrapper)`
        justify-content: center;
    `
    const ForumWrap = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
    `

    const PostButton = styled.button`
        width: 8em;
        margin-top: 1em;
        cursor: pointer;
    `

    const createPost = () => {
        
    }

    useEffect(() => {
        console.log(props.userContext.state, "STATE")
        if(userCompany && userCompany.id){

            GetPostsByCompany(userCompany.id).then(res => {
                console.log(res, "POSTS")
                updatePostsAndComments(res);
            })

        }
    }, [userCompany || posts]);

    const collectPosts = posts && posts.length >= 1 ? posts.map((post, idx) => 
        <Post post={post} key={idx} />   
    ) : "";

    return (
        <CenterForum id={"forum"}>
            <ForumWrap id={"forum-wrap"}>
                <PostButton>Create Post</PostButton>
                <AllPostsWrap>
                    {collectPosts}
                </AllPostsWrap>
            </ForumWrap>
        </CenterForum>
    )
}

export default Forum;