import React, { useState } from 'react';
import styled from 'styled-components';
import UpdateUserRole from '../FetchData/UsersApi/UpdateUserRole'
import CreateCompany from '../FetchData/UsersApi/CreateCompany';

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
const CreateCompanyDropDown = (props) => {
    const [menuState, updateMenuState] = useState({name: "", password: "", type: 'media'});

    const handleChange = (event) => {
        event.persist();
        updateMenuState(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const createCompany = (event) => {
        event.preventDefault();
        CreateCompany(menuState.name, menuState.password, menuState.type, localStorage.getItem("jwt"))
        .then(res => {
            if(res === 500) return 500;            
            props.userContext.setUserCompany();
        }).then(res => {
            if(res === 500) return;
            UpdateUserRole({roleType: "ADMIN"}).then(() => {
                props.userContext.login(localStorage.getItem("jwt"));
                props.toggleDropDownMenu(false);
            });
        })
    }
 
    return  (
        <>
            <Form id="create-comp" onSubmit={createCompany}>
                <Label>Company Name
                    <input 
                        value={menuState.name}
                        required 
                        type="text"
                        name="name" 
                        placeholder="name"
                        onChange={handleChange}
                    />
                </Label>

                <Label>Password
                    <input 
                        required value={menuState.password} 
                        type="password" 
                        name="password"
                        placeholder="create password"
                        onChange={handleChange}
                    />
                </Label>
                
                <Label>Company Type
                    <select required name="type" value={menuState.type} onChange={handleChange}>
                        <option value="media">Media</option>
                        <option value="photography">Photography</option>
                        <option value="film/video">Film/Video</option>
                    </select>
                </Label>
                
            </Form>
            <Button form="create-comp" type="submit">Create Company</Button>
            <Button onClick={() => props.toggleDropDownMenu(prev => !prev)}>Back</Button>
        </>
    )
};

export default CreateCompanyDropDown;