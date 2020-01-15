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
            password: ''
        }
    }

    handleChange = (event) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
    const showCreateMenu = this.props.showCreateMenu ? "show-menu" : null;
        return  (
            <div className={`create-company-menu ${showCreateMenu}`}>
                <Div>
                    <Form id="create-comp" onSubmit={this.props.createCompany}>
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
                            <select required name="type">
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