import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import CompanyList from './CompanyList';
import Inventory from './Inventory';
// import UserHeader from './UserHeader';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null
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

  componentWillUnmount(){
    console.log("WHAT?!?!?!?!?!? Home");
  }
  /*
    If user doesn't belong to company - Redirect
    to company select page / inventory
  */

  /*
    Create a user page / -> this will render whether
    the user has a company or not
   */

  render(){
    return (
      <div className="home">
        <div className="inner-header"></div>
      {!this.props.jwt && <Redirect to="/"/>}
        <Inventory jwt={this.props.jwt}/>
        <CompanyList jwt={this.props.jwt}/>
      </div>
    )
  }
}

export default Home;
