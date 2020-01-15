import React, {Component} from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
// import styled from 'styled-components';
import UserHeader from './Components/UserHeader';
import {
  BrowserRouter as Router,
  Route,
  Switch
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
    // Saves token to local storage & component state
    localStorage.setItem('jwt', token);
    this.setState({
      jwt: token
    })
  }

  componentDidMount(){
    const myHeaders = new Headers();
    // Get userRoles - if one doesn't exist create one - this is temp
    myHeaders.append('Content-Type', 'application/json');
    fetch("http://localhost:8082/userRole/listall", {
      method: 'get',
      headers: myHeaders
    })
    .then(res => res.json())
    .then(res => {
      const findBasic = res.find(item => {
        return item.roleType === "BASIC";
      })
      if(!findBasic || findBasic.roleType !== "BASIC"){
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
    })
  }

  componentWillUnmount(){
    console.log("WHAT?!?!?!?!?!? App");
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
    })
  }

  render(){
    return (
      <div className="main-container">
        <header>
          <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
          <span>Equipped</span>
          <UserHeader user={this.state.user}/>
        </header>
          <main>
            <Router>
                <SignUp updateJwt={this.updateJwt}
                    jwt={this.state.jwt} 
                    />
                
                <LogIn updateJwt={this.updateJwt}
                    jwt={this.state.jwt} 
                    getUser={this.getUser}
                    />
                    
                <Route
                  path="/home"
                  component={() =>
                  <Home jwt={this.state.jwt} 
                    user={this.state.user}
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
