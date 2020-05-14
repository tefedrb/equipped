import React, { useState, useEffect} from 'react';
import { Wrapper } from '../MiddleViewWrapper';
import GetPostsByCompany from '../FetchData/UsersApi/GetPostsByCompany';
import styled from 'styled-components';
import Post from './Post';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import ForumPostDropDown from '../DropDownMenu/ForumPostDropDown';
import UsersList from '../Forum/UsersList';
import { UserConsumer } from '../UserContext';

const AllPostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 30em;
    overflow: auto;
`
const CenterForum = styled(Wrapper)`
    justify-content: center;
`
const ForumWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PostButton = styled.button`
    width: 8em;
    margin: 1em 0;
    cursor: pointer;
`
const Forum = (props) => {
    const [forumState, updateForumState] = useState({ posts: null, postMenuDisplay: false});
    const { userCompany } = props.userContext.state;

    const togglePostMenu = () => {
        updateForumState(prevState => {
            return {
                ...prevState,
                postMenuDisplay: !prevState.postMenuDisplay
            }
        })
    }

    useEffect(() => {
        if(userCompany && userCompany.id){
            GetPostsByCompany(userCompany.id).then(res => {
                updateForumState(prevState => { 
                    return { 
                            ...prevState, 
                            posts: res
                        }
                });
            })
        }
    }, [userCompany]);

    const collectPosts = forumState.posts && forumState.posts.length >= 1 ? forumState.posts.map((post, idx) => 
        <Post post={post} key={idx} />   
    ).reverse() : "";

    return (
        <CenterForum id={"forum"}>
            <UserConsumer>
                { context => 
                    <>
                        <ForumWrap id={"forum-wrap"}>
                            <PostButton onClick={togglePostMenu}>Create Post</PostButton>
                                <DropDownMenu
                                    parentMenuDisplaySwitch={forumState.postMenuDisplay}
                                    toggleParentMenuSwitch={togglePostMenu}
                                    render={display => 
                                        <ForumPostDropDown
                                            displayMenu={display}
                                            userContext={context}
                                        />
                                    }    
                                />
                            <AllPostsWrap id={"all-posts-wrap"}>
                                {collectPosts}
                            </AllPostsWrap>
                        </ForumWrap>
                        <UsersList userContext={context}/>
                    </>
                }
            </UserConsumer> 
        </CenterForum>
    )
}

export default Forum;
