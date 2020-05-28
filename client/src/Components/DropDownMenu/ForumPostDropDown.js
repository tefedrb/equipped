import React, { useState } from 'react';
import styled from 'styled-components';
import CreatePost from '../FetchData/UsersApi/CreatePost';

const Button = styled.button `
    width: 75px;
    height: 25px;
    font-size: .2em;
`
const Form = styled.form `
    display: flex;
    flex-direction: column;
    max-height: 250px;
`
const Label = styled.label `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentInput = styled.textarea`
    min-width: 30em;
    min-height: 10em;
`
const ForumPostDropDown = (props) => {
    const [menuState, updateMenuState] = useState({title: "", content: ""});

    const handleChange = (event) => {
        event.persist();
        updateMenuState(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const createPost = (event) => {
        event.preventDefault();
        CreatePost({title: menuState.title, post_username: null, post_txt: menuState.content})
        .then(() => {
            props.displayMenu(prev => !prev);
            props.userContext.setUserCompany();
        })
    }
 
    return  (
        <>
            <Form id="create-post" onSubmit={createPost}>
                <Label>Title
                    <input 
                        value={menuState.title}
                        required 
                        type="text"
                        name="title" 
                        placeholder="title"
                        onChange={handleChange}
                    />
                </Label>

                <Label>Content
                    <ContentInput
                        required value={menuState.content} 
                        type="text" 
                        name="content"
                        placeholder="content"
                        onChange={handleChange}
                    />
                </Label>
            </Form>
            <Button form="create-post" type="submit">Post</Button>
            <Button onClick={() => props.displayMenu()}>Back</Button>
        </>
    )
};

export default ForumPostDropDown;