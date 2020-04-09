import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home';
// import styled from 'styled-components';
import UserHeader from './Components/UserHeader/UserHeader';
import AccessAccount from './Components/AccountAccess/AccessAccount';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userLoggedIn: false,
    }
  }

  componentDidMount(){
    /* Trying to rehydrate state with user data after browser
     refresh */
    if(localStorage.getItem('user')){
      this.setState({
       user: JSON.parse(localStorage.getItem('user')),
       userLoggedIn: true
      })
    }
  }

  logOut = () => {
    alert("You have been logged out.");
    localStorage.clear();
    window.location.reload();
  }

  getUser = (company) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    fetch("http://localhost:8082/user/retrieve", {
      method: 'get',
      headers: myHeader
    })
    .then(res => res.json())
    .then(res => {
      // Adds user to local storage
      localStorage.setItem('user', JSON.stringify(res));
      if(company) res.company = company;
      this.setState({
        userLoggedIn: true,
        user: res
      })
    })
  }

  getUserCompany = (res) => {
    // grab response and add to user object in state and in local 
    const {id, name, type} = res;
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    loggedInUser.userCompany = {id,name,type};
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    this.setState(prevState => ({
      user: {
          ...prevState.user, 
          loggedInUser
      }
    }))
  }

  render(){
    const loggedIn = this.state.userLoggedIn ? <Redirect to="/home" /> : null;
    return (
      <div className="main-container">
        <header>
          <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
          <h1>Equipped</h1>
          <UserHeader 
            logout={this.logOut} 
            user={this.state.user}
          />
        </header>
        <main>
          <Router>   
            <AccessAccount 
              exact path="/"
              getUser={this.getUser}
            />     
            {loggedIn}
            <Route
              path="/home"
              component={() =>
              <Home 
                getUserCompany={this.getUserCompany}
                user={this.state.user}
                logOut={this.logOut}
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
