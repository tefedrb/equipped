import React, {useState, useEffect} from 'react';
import MiddleViewWrapper from '../MiddleViewWrapper';
import GetPostsByCompany from '../FetchData/UsersApi/GetPostsByCompany';
import styled from 'styled-components';
import Post from './Post';

const Forum = (props) => {
    const [posts, updatePostsAndComments] = useState();
    const { userCompany } = props.userContext.state;

    const ForumWrap = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    `

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
        <MiddleViewWrapper>
            <ForumWrap>
                {collectPosts}
            </ForumWrap>
        </MiddleViewWrapper>
    )
}

export default Forum;