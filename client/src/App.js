import React, {Component} from 'react';
import './CSS/index.css';
import Home from './Components/Home/Home';
import UserHeader from './Components/UserHeader/UserHeader';
import AccessAccount from './Components/AccountAccess/AccessAccount';
import Footer from './Components/Footer';
import GetUser from './Components/FetchData/GetUser';
import GetUserCompany from './Components/FetchData/GetUserCompany';
import GetWaitList from './Components/FetchData/GetWaitList';
import JoinWaitList from './Components/FetchData/JoinWaitList';
import GetInventory from './Components/FetchData/InventoryApi/GetInventory';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {UserProvider} from './Components/UserContext';

class App extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      userCompany: null,
      companyInventory: null,
      waitList: null,
      userLoggedIn: false
    }
  }

  componentDidMount(){
     this._isMounted = true;
    if(localStorage.getItem('jwt')){
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
      .then(async (responses) => {
        if(responses[1].id){
          const companyInventory = await GetInventory(responses[1].id);
          responses.push(companyInventory);
        }
        return responses;
      })
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
            companyInventory: responses[3],
            waitList: responses[2]
          })
        }
        console.log(responses, "< -!!!!!!!!!!!!!!!!!");
      })
      .catch(err => {
        console.log("Error in login ", err);
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
    const userCompany = await GetUserCompany(localStorage.getItem('jwt'))
    if(userCompany.id != null && this._isMounted){
    const inventory = await GetInventory(userCompany.id)
        delete userCompany.password;
        delete userCompany.users;
        delete userCompany.waitList;
        localStorage.setItem('userCompany', JSON.stringify(userCompany));
        this.setState(prevState => {
          return {
              ...prevState,
            companyInventory: inventory,
            userLoggedIn: true,
            userCompany: userCompany
          }
        });
      }
  }

  checkForWaitList = async () => {
    await GetWaitList(localStorage.getItem('jwt')).then(res => {
      if(res.id != null && this._isMounted){
        this.setState({
          waitList: {id: res.id, name: res.companyName}
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
    const response = await GetInventory(company_id).then(res => {
      this.setState(prevState => {
          return {
            ...prevState,
            companyInventory: res
          }
      })
      return res;
    })
    return response;
  }

  render(){
    // const loggedIn = this.state.userLoggedIn ? <Redirect to="/home" /> : null;
    return (
      <UserProvider value={{
          state: this.state,
          refreshInventory: this.refreshInventory,
          logOut: this.logOut,
          setUserCompany: this.setUserCompany,
          joinWaitList: this.joinWaitList
        }}>
        <Router>  
          <div className="main-container">
              <UserHeader
                loggedIn={this.state.userLoggedIn}
                userCompany={this.state.userCompany}
                logout={this.logOut} 
                user={this.state.user}
                waitList={this.state.waitList}
              />
              <Route 
                exact path="/" 
                render={() => 
                  <AccessAccount 
                    login={this.login}
                    setUserCompany={this.setUserCompany}
                    checkForWaitList={this.checkForWaitList}
                    setUser={this.setUser}
                  />
                }
              />   
              <Route
                path="/home"
                render={({ match }) => <Home match={match}/>}
              /> 
              <Footer />  
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
