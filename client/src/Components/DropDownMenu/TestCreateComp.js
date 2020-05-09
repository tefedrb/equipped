import React, {useState} from 'react';
import styled from 'styled-components';
import CreateCompany from '../FetchData/UsersApi/CreateCompany';

const Div = styled.div `
    display: flex;
    background-color: white;
    color: black;
    border-radius: 5px;
    flex-grow: .66;
    height: 70%;
    margin: 5%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: black;
`
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


const TestCreateComp = (props) => {
    const [menuState, updateMenuState] = useState({name: "", password: "", type: 'media'});

    const handleChange = (event) => {
        console.log(event.target.name)
        updateMenuState(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const createCompany = (event) => {
        event.preventDefault();
        // Check if user has company else continue
        CreateCompany(menuState.name, menuState.password, menuState.type)
        .then(() => {
            props.displayMenu(prev => !prev);
            // Insert company information into user
            props.userContext.setUserCompany();
        })
    }
 
    const showCreateCompMenu = props.showDropDown ? "show-menu" : null;
    return  (
        <Div>
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
            <Button onClick={() => props.displayMenu(prev => !prev)}>Back</Button>
        </Div>
    )
};

export default TestCreateComp;