import React, {Component} from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
// import styled from 'styled-components';
import UserHeader from './Components/UserHeader';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      jwt: null
    }
    // this.updateJwt = this.updateJwt.bind(this);
  }

  updateJwt = (token) => {
    this.setState({
      jwt: token
    })
  }

  componentDidMount(){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch("http://localhost:8082/userRole/create", {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(
        {
          roleType: "BASIC"
        }
      )
    })
  }

  getUser = () => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', `Bearer ${this.state.jwt}`);
    fetch("http://localhost:8082/user/retrieve", {
      method: 'get',
      headers: myHeader
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        user: res
      })
      console.log(this.state.user)
    })
  }

  render(){
    return (
      <div className="testing">
        <header>
          <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
          <span>Equipped</span>
          <UserHeader user={this.state.user}/>
        </header>
          <main>
            <Router>
              <Route
                exact path="/"
                component={() => <SignUp updateJwt={this.updateJwt}
                  jwt={this.state.jwt} />}
              />
              <Route
                exact path="/"
                component={() => <LogIn updateJwt={this.updateJwt}
                  jwt={this.state.jwt} />}
              />
              <Route
                path="/home"
                component={() => 
                <Home jwt={this.state.jwt} 
                  getUser={this.getUser} user={this.state.user}
                />}
              />
            </Router>
          </main>
          <footer>
          <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
          </footer>
      </div>
    );
  }
}

export default App;
