import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home/Home';
import UserHeader from './Components/UserHeader/UserHeader';
import AccessAccount from './Components/AccountAccess/AccessAccount';
import Footer from './Components/Footer';
import GetUser from './Components/FetchData/GetUser';
import GetUserCompany from './Components/FetchData/GetUserCompany';
import GetWaitList from './Components/FetchData/GetWaitList';
import GetCompanyByWaitList from './Components/FetchData/GetCompanyByWaitList';
import JoinWaitList from './Components/FetchData/JoinWaitList';
import GetInventory from './Components/FetchData/InventoryApi/GetInventory';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
// import InventoryView from './Components/CompanyView/EquipmentView/InventoryView';

import {UserProvider} from './Components/UserContext';

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
     this._isMounted = true;
     console.log("app mounted");

    if(localStorage.getItem('jwt')){
      console.log("in if statement")
      this.login(localStorage.getItem('jwt'));
    }
  }

  logOut = () => {
    alert("You have been logged out.");
    localStorage.clear();
    window.location.reload();
  }

  login = async (jwt) => {
    await Promise.all([GetUser(jwt), GetUserCompany(jwt, GetInventory), GetWaitList(jwt)])
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

  setWaitListCompanyName = async (id) => {
    await GetCompanyByWaitList(id).then(res => {
      this.setState({
        waitListCompany: res.name
      })
    })
  }

  setUser = async () => {
    await GetUser(localStorage.getItem('jwt')).then(res => {
      const user = res;
      delete user.password;
      if(this._isMounted){
        this.setState({
          loggedIn: true,
          user: user
        })
      }
    })
  }

  setUserCompany = async () => {
    await GetUserCompany(localStorage.getItem('jwt'), GetInventory).then(res => {
      console.log("In Set User Company")
        const userCompany = {...res};
        delete userCompany.password;
        delete userCompany.users;
        delete userCompany.waitList;
        localStorage.setItem('userCompany', JSON.stringify(userCompany));
      if(res.id != null && this._isMounted){
        console.log(userCompany, "<in setUserCompany")
        this.setState({
          userLoggedIn: true,
          userCompany: userCompany
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

  userCompanyLocal = (res) => {
    // grab response and add to user object in state and in local 
    const {id, name, type} = res;
    const userCompany = {id,name,type};
    localStorage.setItem('userCompany', JSON.stringify(userCompany));

    this.setState({
        userCompany: userCompany
      })
  }

  refreshInventory = async (company_id) => {
    await GetInventory(company_id).then(res => {
      this.setState(prevState => {
        console.log(prevState, "Prev state in refreshInventory")
        console.log(prevState.userCompany.inventory, "prevState.userCompany.inventory")
        const userCompany = prevState.userCompany;
        userCompany.inventory = res;
          return {
            ...prevState,
            userCompany: userCompany
          }
      })
    })
  }

  componentDidUpdate(prevProps){
  
  }

  render(){
    const loggedIn = this.state.userLoggedIn ? <Redirect to="/home" /> : null;
    return (
      <UserProvider value={{
          state: this.state,
          refreshInventory: this.refreshInventory
        }}>
        <Router>  
          <div className="main-container">
              <UserHeader 
                loggedIn={this.state.userLoggedIn}
                userCompany={this.state.userCompany}
                logout={this.logOut} 
                user={this.state.user}
                setWaitListCompanyName={this.setWaitListCompanyName}
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
                    setUser={this.setUser}
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
      </UserProvider>
    );
  }
}

export default App;
