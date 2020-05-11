import React, { useState, useEffect } from 'react';
import { Wrapper } from '../MiddleViewWrapper';
import GetPostsByCompany from '../FetchData/UsersApi/GetPostsByCompany';
import styled from 'styled-components';
import Post from './Post';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import ForumPostDropDown from '../DropDownMenu/ForumPostDropDown';
import { UserConsumer } from '../UserContext';

const Forum = (props) => {
    const [forumState, updateForumState] = useState({ posts: null, postMenuDisplay: false});
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
        updateForumState(prevState => {
            return {
                ...prevState,
                postMenuDisplay: true
            }
        })
    }

    useEffect(() => {
        console.log(props.userContext.state, "STATE")
        if(userCompany && userCompany.id){
            GetPostsByCompany(userCompany.id).then(res => {
                console.log(res, "POSTS")
                updateForumState(prevState => { 
                    return { 
                            ...prevState, 
                            posts: res
                        }
                });
            })
        }
    }, [userCompany || forumState.posts]);

    const collectPosts = forumState.posts && forumState.posts.length >= 1 ? forumState.posts.map((post, idx) => 
        <Post post={post} key={idx} />   
    ) : "";

    return (
        <CenterForum id={"forum"}>
            <ForumWrap id={"forum-wrap"}>
                <PostButton onClick={() => createPost()}>Create Post</PostButton>
                <UserConsumer>{context => 
                    <DropDownMenu
                        parentForceMenuDisplay={forumState.postMenuDisplay} 
                        render={display => 
                            <ForumPostDropDown 
                                displayMenu={display}
                                userContext={context}
                            />}    
                    /> 
                    }
                </UserConsumer>
                <AllPostsWrap>
                    {collectPosts}
                </AllPostsWrap>
            </ForumWrap>
        </CenterForum>
    )
}

export default Forum;

// {

//     <DropDownMenu
//         parentForceMenuDisplay={forumState.postMenuDisplay} 
//         render={display => 
//             <ForumPostDropDown 
//                 displayMenu={display}
//                 userContext={context}
//             />}    
//     /> 

// }
