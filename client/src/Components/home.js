import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import CompanyList from './CompanyList';
import Inventory from './Inventory';
import CreateCompanyMenu from './CreateCompanyMenu';
import {Route} from 'react-router-dom';
import CompanyView from './CompanyView';
import InnerNav from './InnerNav/InnerNav';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      showCreateMenu: false,
    }
  }
 
  toggleCreateCompany = () => {
    /* Might want to create a conditional here that checks
     to see if the user already has a company?? */
    this.setState(prevState => ({
      showCreateMenu: !prevState.showCreateMenu
    }))
  }

  // Move create company menu into company list?
  render(){
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <InnerNav />
        <CreateCompanyMenu 
          toggleCreateCompany={this.toggleCreateCompany} 
          showCreateMenu={this.state.showCreateMenu}
          createCompany={this.createCompany}
          getUserCompany={this.props.getUserCompany}
        />
        <main className="home-main">
          <Route exact path="/home">
            <Inventory 
              showCreateMenu={this.state.showCreateMenu} 
            /> 
          </Route>
          <Route exact path="/home">
            <CompanyList
              logout={this.logOut} 
              showCreateMenu={this.state.showCreateMenu}
              toggleCreateCompany={this.toggleCreateCompany} 
            />
          </Route>
          <Route path="/home/company">
            <CompanyView />
          </Route>
        </main> 
      </div>
    )
  }
}

export default Home;
