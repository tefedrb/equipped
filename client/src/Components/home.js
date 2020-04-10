import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../CSS/App.css';
import CompanyList from './CompanyList/CompanyList';
import MainDisplay from './MainDisplay';
import CreateCompanyMenu from './CreateCompanyMenu';
import {Route} from 'react-router-dom';
import CompanyView from './CompanyView';
import InnerNav from './InnerNav/InnerNav';
import CheckJwt from '../CheckJwt';

class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      company: null,
      type: null,
      showCreateCompMenu: false,
      selectedCompany: null,
      user: this.props.user,
      waitList: null
    }
  }
 
  toggleCreateCompany = () => {
    /* Might want to create a conditional here that checks
     to see if the user already has a company?? */
    this.setState(prevState => ({
      showCreateCompMenu: !prevState.showCreateCompMenu
    }))
  }

  componentDidMount(){
    this._isMounted = true;
    if(localStorage.getItem('jwt')){
      this.getUserCompany();
      this.checkForWaitList();
      CheckJwt(localStorage.getItem('jwt'));
    }
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
      // Display company of user
      console.log(res, "<- company")
      if(res.id != null && this._isMounted){
        this.setState({
          company: res.name,
          type: res.type
        });
      }
    })
    .catch(error => 
      console.log("Can't find user compnay: ", error)
    )
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
      // Display company of user
      if(res.id != null && this._isMounted){
        this.setState({
          waitList: res.id
        });
      }
    })
    .catch(error => 
      console.log("Error in checkForWaitList ", error)
    )
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getCompanyInfo = (id) => {
    fetch("http://localhost:8080/users-api/company/" + id, {
      method: 'get',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        selectedCompany: res
      })
    })
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
  }

  // Move create company menu into company list?
  render(){
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <InnerNav />
        <CreateCompanyMenu 
          toggleCreateCompany={this.toggleCreateCompany} 
          showCreateCompMenu={this.state.showCreateCompMenu}
          createCompany={this.createCompany}
          getUserCompanyLocal={this.props.getUserCompanyLocal}
        />
        <main className="home-main">
          <Route exact path="/home">
            <MainDisplay
              waitList={this.state.waitList}
              joinWaitList={this.joinWaitList}
              company={this.state.company}
              selectedCompany={this.state.selectedCompany}
              showCreateCompMenu={this.state.showCreateCompMenu} 
            /> 
          </Route>
          <Route exact path="/home">
            <CompanyList
              getCompanyInfo={this.getCompanyInfo}
              logout={this.logOut} 
              showCreateCompMenu={this.state.showCreateCompMenu}
              toggleCreateCompany={this.toggleCreateCompany} 
            />
          </Route>
          <Route path="/home/company">
            <CompanyView 
              company={this.state.company}
              companyType={this.state.companyType}
            />
          </Route>
        </main> 
      </div>
    )
  }
}

export default Home;
