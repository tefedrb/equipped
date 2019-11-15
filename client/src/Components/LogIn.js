import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      username: '',
      password: '',
      isFormVisible: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    fetch("http://localhost:8082/login", {
      method: 'post',
      headers: {
        "Accept" : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(res => {
        this.props.updateJwt(res.token)
      }
    )
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleForm(e){
    this.setState(prevState => ({
      isFormVisible: !prevState.isFormVisible
    }));
  };


  render(){
    if(this.props.jwt){
      return <Redirect to="/home" />
    }
    const Button = styled.button`
      background: rgba(37, 208, 125, 0.52);
      border-radius: 2px;
      border: 1px solid white;
      color: white;
      font-size: calc(10px + 2vmin);
      margin: 0 1em;
      padding: 0.25em 1em;
      &:hover{
        background-color: rgba(37, 208, 125, 1)
      }
    `;

    return (
      <div>
      <Button onClick={this.toggleForm}>Log In</Button>
        <form className={`enterApp ${this.state.isFormVisible ? "" : "hide"}`} onSubmit={this.handleSubmit}>
            <input name="username"
              type="text"
              value={this.state.username}
              placeholder="username..."
              onChange={this.handleChange}
            />
            <input name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="password..."
            />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LogIn;
