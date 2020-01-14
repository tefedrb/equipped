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
      showCreateMenu: false
    }
  }

  componentDidMount(){
    // Get user info

    // This is mounting twice
    console.log(this.props.user, "<-- why?")
    if(!this.props.user){
      try {
        // Make a call to user company based off userID or Name
        fetch("http://localhost:8082/company/userCompany", {
          method: 'get',
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
          }
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
      } catch(error){
        console.log(`Error for /company/userCompany: ${error}`);
      }
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

  createCompany = (event) => {
    console.log(event, "<--- create company")
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.props.jwt}`);
    try {
        fetch("http://localhost:8082/company/create", {
        method: 'post',
        headers: myHeaders,
        body: JSON.stringify({
          name: event.target.name,
          password: event.target.password,
          type: event.target.type
        }).then(res => {
          console.log(res);
        })
      })
    } catch(error) {
      console.log(`Error: ${error}`);
    }
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
          {!this.props.jwt && <Redirect to="/"/>}
          <Inventory 
            showCreateMenu={this.state.showCreateMenu} 
            jwt={this.props.jwt}
          />
          <CompanyList 
            showCreateMenu={this.state.showCreateMenu}
            toggleCreateCompany={this.toggleCreateCompany} 
            jwt={this.props.jwt}
          />
        </main>
      </div>
    )
  }
}

export default Home;
