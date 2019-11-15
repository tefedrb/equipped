import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      title: null
    }
  }

  componentDidMount(){
    fetch("http://localhost:8082/signup", {
      method: 'post',
      headers: {
        "Accept" : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        title: this.state.title,
        userRole: {
          roleType: "BASIC"
        }
      })
    })
    .then(res => res.json())
    .then(res => {
        this.props.updateJwt(res.token)
      }
    )
  }

  render(){
    if(!this.props.jwt){
      return (
        <Redirect to="/" />
      )
    }
    return(
        <div>
          Welcome
        </div>
    );
  }
}

export default Home;
