import React, {Component} from 'react';
import styled from 'styled-components';

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

class CreateCompanyMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
            type: 'media'
        }
    }

    handleChange = (event) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createCompany = (event) => {
        event.preventDefault();
        // Check if user has company else continue
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
        fetch("http://localhost:8080/users-api/company/create", {
            method: 'post',
            headers: myHeaders,
            body: JSON.stringify({
              name: this.state.name,
              password: this.state.password,
              type: this.state.type
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.props.toggleCreateCompany();
            // Insert company information into user
            fetch("http://localhost:8080/users-api/company/user-company", {
                method: 'get',
                headers: myHeaders
            })
            .then(res => res.json())
            .then(res => {
                console.log(res, "retrieve user company");
                // Reach in and add to user
                this.props.getUserCompanyLocal(res);
            })
        })
        .catch(error =>{
        console.log(error);
        })
    }

    render(){
    const showCreateCompMenu = this.props.showCreateCompMenu ? "show-menu" : null;
        return  (
            <div className={`create-company-menu ${showCreateCompMenu}`}>
                <Div>
                    <Form id="create-comp" onSubmit={this.createCompany}>
                        <Label>Company Name
                            <input 
                                value={this.state.name}
                                required 
                                type="text"
                                name="name" 
                                placeholder="name"
                                onChange={this.handleChange}
                            />
                        </Label>

                        <Label>Password
                            <input 
                                required value={this.state.password} 
                                type="password" 
                                name="password"
                                placeholder="create password"
                                onChange={this.handleChange}
                            />
                        </Label>
                        
                        <Label>Company Type
                            <select required name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="media">Media</option>
                                <option value="photography">Photography</option>
                                <option value="film/video">Film/Video</option>
                            </select>
                        </Label>
                    </Form>
                    <Button form="create-comp" type="submit">Create Company</Button>
                    <Button onClick={this.props.toggleCreateCompany}>Back</Button>
                </Div>
            </div>
        )
    }
};

export default CreateCompanyMenu;