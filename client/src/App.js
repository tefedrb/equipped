import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home/Home';
// import styled from 'styled-components';
import UserHeader from './Components/UserHeader/UserHeader';
import AccessAccount from './Components/AccountAccess/AccessAccount';
import Footer from './Components/Footer';
// import GetUser from './Components/FetchData/GetUser';
// import GetUserCompany from './Components/FetchData/GetUser';
// import GetWaitList from './Components/FetchData/GetUser';
// import JoinWaitList from './Components/FetchData/JoinWaitList';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userCompany: null,
      waitListId: null,
      waitListCompany: null,
      userLoggedIn: false,
    }
  }

  componentDidMount(){
    /* Trying to rehydrate state with user data after browser
     refresh */
     this._isMounted = true;
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

  getCompanyByWaitList = (id) => {
    fetch("http://localhost:8080/users-api/company/by-wait-list/ " + id, {
      method: 'get',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res, " < company by waitlistId");
        this.setState({
          waitListCompany: res.name
        })
      })
  }

  getUser = () => {
    fetch("http://localhost:8080/users-api/user/retrieve", {
      method: 'get',
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }
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
          console.log("Error in GetUser ", err);
      })
  }

  getUserCompany = () => {
    fetch("http://localhost:8080/users-api/company/user-company", {
      method: 'get',
      headers:{
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.id != null && this._isMounted){
          const {id, name, type} = res;
          this.setState({
            userCompany: {id, name, type}
          });
        }
      })
      .catch(err => {
        console.log("Error in getUserComp", err)
      }) 
  }

  checkForWaitList = () => {
    fetch("http://localhost:8080/users-api/wait-list/by-user", {
      method: 'get',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.id != null && this._isMounted){
          this.setState({
            waitListId: res.id
          });
        }
      })
      .catch(error => 
          console.log("Error in checkForWaitList ", error)
      )
  }

  joinWaitList = (id) => {
    fetch("http://localhost:8080/users-api/wait-list/join/" + id, {
      method: 'put',
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
          console.log(res, " Waitlist");
      })
      .catch(err => {
        console.log("Error in joinWaitList ", err);
      })
  }

  getUserCompanyLocal = (res) => {
    // grab response and add to user object in state and in local 
    const {id, name, type} = res;
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    loggedInUser.userCompany = {id,name,type};
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    this.setState({
        userCompany: loggedInUser.userCompany
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
            loggedIn={this.state.userLoggedIn}
            userCompany={this.state.userCompany}
            logout={this.logOut} 
            user={this.state.user}
            getCompanyByWaitList={this.getCompanyByWaitList}
            waitListCompany={this.state.waitListCompany}
            waitListId={this.state.waitListId}
          />
          <Route 
            exact path="/" 
            render={() => 
              <AccessAccount 
                getUser={this.getUser}
              />}
            />   
          {loggedIn}
          <Route
            path="/home"
            render={() =>
              <Home 
                getUserCompany={this.getUserCompany}
                checkForWaitList={this.checkForWaitList}
                joinWaitList={this.joinWaitList}
                waitListId={this.state.waitListId}
                user={this.state.user}
                userCompany={this.state.userCompany}
                logOut={this.logOut}
              />}
          /> 
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
