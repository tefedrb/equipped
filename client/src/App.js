import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home/Home';
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
     console.log("app mounted");
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

  getUser = () => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    fetch("http://localhost:8080/users-api/user/retrieve", {
      method: 'get',
      headers: myHeader
    })
    .then(res => res.json())
    .then(res => {
      // Adds user to local storage
      localStorage.setItem('user', JSON.stringify(res));
      this.setState({
        userLoggedIn: true,
        user: res
      })
    })
    .catch(err => {
      console.log("Error in getUser ", err);
    })
  }

  componentDidUpdate(prevProps){
    if(this.state !== prevProps){
      
    }
  }

  render(){
    const loggedIn = this.state.userLoggedIn ? <Redirect to="/home" /> : null;
    return (
      <Router>  
        <div className="main-container">
          <UserHeader 
            logout={this.logOut} 
            user={this.state.user}
          />
          <Route 
            exact path="/" 
            render={() => <AccessAccount getUser={this.getUser}/>}
            />   
          {loggedIn}
          <Route
            path="/home"
            render={() =>
              <Home 
                user={this.state.user}
                logOut={this.logOut}
              />
            }
          /> 
          <footer>
            <img src="https://img.icons8.com/ios/50/000000/camera.png" alt="cam-icon"/>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
