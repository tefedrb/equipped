import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home/Home';
// import styled from 'styled-components';
import UserHeader from './Components/UserHeader/UserHeader';
import AccessAccount from './Components/AccountAccess/AccessAccount';
import Footer from './Components/Footer';
import GetUser from './Components/FetchData/GetUser';
import GetUserCompany from './Components/FetchData/GetUserCompany';
import GetWaitList from './Components/FetchData/GetWaitList';
import GetCompanyByWaitList from './Components/FetchData/GetCompanyByWaitList';
import JoinWaitList from './Components/FetchData/JoinWaitList';
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
      user: JSON.parse(localStorage.getItem('user')),
      userCompany: null,
      waitListId: null,
      waitListCompany: null,
      userLoggedIn: false
    }
  }

  componentDidMount(){
    /* Trying to rehydrate state with user data after browser
     refresh */
     this._isMounted = true;
     console.log("app mounted");
     console.log(this.state.user, "app user")
    if(localStorage.getItem('jwt') && !this.state.user){
      this.login(localStorage.getItem('jwt'));
    }
  }

  logOut = () => {
    alert("You have been logged out.");
    localStorage.clear();
    window.location.reload();
  }

  login = async (jwt) => {
    await Promise.all([GetUser(jwt), GetUserCompany(jwt), GetWaitList(jwt)])
      .then((responses) => {
        const user = responses[0];
        delete user.password;
        localStorage.setItem('user', JSON.stringify(user));

        const userCompany = {...responses[1]};
        delete userCompany.password;
        delete userCompany.users;
        delete userCompany.waitList;
        localStorage.setItem('userCompany', JSON.stringify(userCompany));
        
        if(this._isMounted){
          this.setState({
            userLoggedIn: true,
            user: user,
            userCompany: userCompany.id ? userCompany : null,
            waitListId: responses[2].id
          })
        }
        console.log(responses, "< -!!!!!!!!!!!!!!!!!");
      })
      .catch(err => {
        console.log("Error in login ", err);
      })
  }

  getCompanyByWaitList = async (id) => {
    await GetCompanyByWaitList(id).then(res => {
      this.setState({
        waitListCompany: res.name
      })
    })
  }

  getUser = async () => {
    await GetUser(localStorage.getItem('jwt')).then(res => {
      console.log("getUser() used!!!!!!! (replace)", res)
    })
  }

  setUserCompany = async () => {
    await GetUserCompany(localStorage.getItem('jwt')).then(res => {
      if(res.id != null && this._isMounted){
        const {id, name, type} = res;
        this.setState({
          userCompany: {id, name, type}
        });
      }
    })
  }

  checkForWaitList = async () => {
    await GetWaitList(localStorage.getItem('jwt')).then(res => {
      if(res.id != null && this._isMounted){
        this.setState({
          waitListId: res.id
        });
      }
    })
  }

  joinWaitList = async (id) => {
    await JoinWaitList(id, localStorage.getItem('jwt')).then(res => {
      console.log(res, " Joined Waitlist")
    })
  }

  UserCompanyLocal = (res) => {
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
    console.log("udate in app")
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
                login={this.login}
                setUserCompany={this.setUserCompany}
                checkForWaitList={this.checkForWaitList}
                getUser={this.getUser}
              />}
            />   
          {loggedIn}
          <Route
            path="/home"
            render={() =>
              <Home 
                setUserCompany={this.setUserCompany}
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
