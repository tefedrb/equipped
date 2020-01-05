import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import CompanyList from './CompanyList';
import Inventory from './Inventory';
import UserHeader from './UserHeader';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      company: null
    }
  }

  componentDidMount(){
    // Get user info
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', `Bearer ${this.props.jwt}`);
    fetch("http://localhost:8082/user/retrieve", {
      method: 'get',
      headers: myHeader
    })
    .then(res => res.json())
    .then(res => {
        this.setState({
          user: res
        })
        console.log(this.state.user)
      }
    )
    // Make a call to user company based off userID or Name
    // fetch("http://localhost:8082/")
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
        <UserHeader user={this.state.user} />
      {!this.props.jwt && <Redirect to="/"/>}
        <Inventory jwt={this.props.jwt}/>
        <CompanyList jwt={this.props.jwt}/>
      </div>
    )
  }
}

export default Home;
