import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount(){
  //   console.log(this.props, "<---- PROPS")
  // }

  handleSubmit(event){
    event.preventDefault();
    fetch("http://localhost:8082/signup", {
      method: 'post',
      headers: {
        "Accept" : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        title: this.state.title,
        userRole : {
          roleType: "ADMIN"
        }
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

    console.log(event.target.name, "<--- name")
  }

  render(){
    if(this.props.jwt) return <Redirect to="/home" />;
    if(this.props.jwt) console.log('Eh?', this.props.jwt)
    return (
      <div>
        <form className="signup" onSubmit={this.handleSubmit}>
          <label>
            Sign Up
          </label>
            <input name="title"
              type="text" value={this.state.email}
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
