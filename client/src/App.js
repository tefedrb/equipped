import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      jwt: '',
      title: '',
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Some methods
  // On component mount
  componentDidMount(){

  }

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
    .then(res => this.setState({jwt: res.token}))
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });

    console.log(event.target.name, "<--- name")
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label>
              Sign Up
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
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
