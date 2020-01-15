import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import CompanyList from './CompanyList';
import Inventory from './Inventory';
import CreateCompanyMenu from './CreateCompanyMenu';
// import UserHeader from './UserHeader';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      showCreateMenu: false,
    }
  }
  /*
    If user doesn't belong to company - Redirect
    to company select page / inventory
  */

  /*
    Create a user page / -> this will render whether
    the user has a company or not
   */
  toggleCreateCompany = () => {
    /* Might want to create a conditional here that checks
     to see if the user already has a company?? */
    this.setState( prevState => ({
      showCreateMenu: !prevState.showCreateMenu
    }))
  }

  componentDidMount(){
    console.log("Home Component Mounted");
    console.log(localStorage.getItem('user'))
  }

  componentWillUnmount(){
    console.log("HOME COMPONENT UNMOUNT")
  }

  render(){
    return (
      <div className="home">
        <div className="inner-header"></div>
        <CreateCompanyMenu 
          toggleCreateCompany={this.toggleCreateCompany} 
          showCreateMenu={this.state.showCreateMenu}
          createCompany={this.createCompany}
        />
        <main className="home-main">
          {!localStorage.getItem('jwt') && <Redirect to="/"/>}
          <Inventory 
            showCreateMenu={this.state.showCreateMenu} 
          />
          <CompanyList 
            showCreateMenu={this.state.showCreateMenu}
            toggleCreateCompany={this.toggleCreateCompany} 
          />
        </main>
      </div>
    )
  }
}

export default Home;
