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
    // console.log(this.state.user, "<---- CURRENT SITUATION HOPEFULLY NOT ALWAYS NULL")
    // if(!this.state.user){
    if(!this.props.user){
      const myHeader = new Headers();
      myHeader.append('Content-Type', 'application/json');
      myHeader.append('Authorization', `Bearer ${this.props.jwt}`);
    //   fetch("http://localhost:8082/user/retrieve", {
    //     method: 'get',
    //     headers: myHeader
    //   })
    //   .then(res => res.json())
    //   .then(res => {
    //       this.setState({
    //         user: res
    //       })
    //       this.props.getUser(res);
    //       console.log(this.state.user)
    //     }
    //   )
      // Make a call to user company based off userID or Name
      fetch("http://localhost:8082/company/userCompany", {
        method: 'get',
        headers: myHeader
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          company: res
        })
        console.log(res, " <--- company baby")
      })
        this.props.getUser();
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
