import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import CreateCompanyMenu from '../CreateCompanyMenu';
import {Route} from 'react-router-dom';
import CompanyView from '../CompanyView/CompanyView';
import InnerNav from '../InnerNav/InnerNav';
import CheckJwt from '../../CheckJwt';
import MainView from './MainView';

class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      showCreateCompMenu: false,
      selectedCompany: null,
      companyViewLoaded: false
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
    console.log("Home mounted");
    if(localStorage.getItem('jwt')){
      // this.props.setUserCompany();
      // this.props.checkForWaitList();
      CheckJwt(localStorage.getItem('jwt'));
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
    console.log("home unmount")
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

  // Move create company menu into company list?
  render(){
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}

        <InnerNav />

        <CreateCompanyMenu 
          toggleCreateCompany={this.toggleCreateCompany} 
          showCreateCompMenu={this.state.showCreateCompMenu}
          setUserCompany={this.props.setUserCompany}
        />

        <Route exact path="/home" render={() => 
          <MainView 
            waitListId={this.props.waitListId}
            joinWaitList={this.props.joinWaitList}
            userCompany={this.props.userCompany}
            selectedCompany={this.state.selectedCompany}
            showCreateCompMenu={this.state.showCreateCompMenu}
            getCompanyInfo={this.getCompanyInfo}
            logout={this.logOut}
            userHasCompany={this.props.userCompany ? true : false}  
          />
        }/>

        <Route path="/home/company" render={() => 
          <CompanyView 
            userCompany={this.props.userCompany}
          />
        }/>
      </div>
    )
  }
}

export default Home;