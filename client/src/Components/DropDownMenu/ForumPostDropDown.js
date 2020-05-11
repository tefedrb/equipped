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
const ForumPostDropDown = (props) => {
    const [menuState, updateMenuState] = useState({title: "", content: ""});

    const handleChange = (event) => {
        console.log(event.target.name)
        updateMenuState(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const createPost = (event) => {
        // Event - Title
        // Content
        event.preventDefault();
        // Check if user has company else continue
        CreatePost(menuState.name, menuState.password, menuState.type)
        .then(() => {
            props.displayMenu(prev => !prev);
            // Insert company information into user
            props.userContext.setUserCompany();
        })
    }
 
    return  (
        <>
            <Form id="create-post" onSubmit={createPost}>
                <Label>Title
                    <input 
                        value={menuState.name}
                        required 
                        type="text"
                        name="title" 
                        placeholder="post title"
                        onChange={handleChange}
                    />
                </Label>

                <Label>Password
                    <input 
                        required value={menuState.password} 
                        type="password" 
                        name="content"
                        placeholder="create password"
                        onChange={handleChange}
                    />
                </Label>
            </Form>
            <Button form="create-post" type="submit">Post</Button>
            <Button onClick={() => props.displayMenu(prev => !prev)}>Back</Button>
        </>
    )
};

export default ForumPostDropDown;