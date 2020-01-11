import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import CompanyList from './CompanyList';
import Inventory from './Inventory';
import CreateCompany from './CreateCompany';
// import UserHeader from './UserHeader';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      showCreateMenu: false
    }
  }

  componentDidMount(){
    // Get user info
    // if(!this.state.user){
    if(!this.props.user){
      const myHeader = new Headers();
      myHeader.append('Content-Type', 'application/json');
      myHeader.append('Authorization', `Bearer ${this.props.jwt}`);
        // fetch("http://localhost:8082/company/userCompany", {
        //   method: 'get',
        //   headers: myHeader
        // })
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res, "<-- user company")
        //     // this.props.getUser(res);
        //   }
        // ).catch(err => {
        //   console.log(err, "<-- FOUND ERROR?!");
        // })
      // Make a call to user company based off userID or Name
      fetch("http://localhost:8082/company/userCompany", {
        method: 'get',
        headers: myHeader
      })
      .then(res => res.json())
      .then(res => {
        if(res.name !== "Null"){
          this.setState({
            company: res
          })
        }
        /* This is a method created in App.js that updates parent 
        state in order for UserHeader to work properly */
        this.props.getUser();
      })
    }
  }

  // createCompany = () => {
  //   fetch("http://localhost:8082/company/create", {
  //     method: ''
  //   })
  // }

  /*
    If user doesn't belong to company - Redirect
    to company select page / inventory
  */

  /*
    Create a user page / -> this will render whether
    the user has a company or not
   */
  clickCreateCompany = () => {
    /* Might want to create a conditional here that checks
     to see if the user already has a company?? */
    this.setState( prevState => ({
      showCreateMenu: !prevState.showCreateMenu
    }))
  }


  render(){
    return (
      <div className="home">
        <div className="inner-header"></div>
        <CreateCompany 
          showCreateMenu={this.state.showCreateMenu}
        />
        <main className="home-main">
          {!this.props.jwt && <Redirect to="/"/>}
          <Inventory 
            showCreateMenu={this.state.showCreateMenu} 
            jwt={this.props.jwt}
          />
          <CompanyList 
            showCreateMenu={this.state.showCreateMenu}
            createCompany={this.clickCreateCompany} 
            jwt={this.props.jwt}
          />
        </main>
      </div>
    )
  }
}

export default Home;
