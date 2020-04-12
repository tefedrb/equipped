import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      username: '',
      password: '',
      isFormVisible: false
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/users-api/user/sign-up", {
      method: 'post',
      headers: {
        "Accept" : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        title: this.state.title,
        userRole: {
          roleType: "BASIC"
        }
      })
    })
    .then(res => res.json())
    .then(res => {
        if(!res.token){
          console.log(res)
          alert("Looks like someone already has that username");
        } else {
          localStorage.setItem('jwt', res.token);
          this.props.setUser();
        }
      }
    )
  }

  componentDidMount(){
    console.log("SignUp Mount");
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isFormVisible: !prevState.isFormVisible
    }));
  };

  render(){
    // Here is where we decide whether to redirect to homepage
    if(localStorage.getItem('jwt')){
      return <Redirect to="/home" />
    }

    const Button = styled.button`
      outline: none;
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
        <Button onClick={this.toggleForm}>Sign Up</Button>
        <form 
          className={`enterApp ${this.state.isFormVisible ? "" : "hide"}`} 
          onSubmit={this.handleSubmit}>
            <input name="title"
              type="text" value={this.state.title}
              placeholder="title..."
              onChange={this.handleChange}
            />
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

export default SignUp;
