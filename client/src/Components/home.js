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
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', `Bearer ${this.props.jwt}`);
    console.log(this.props.jwt);
    fetch("http://localhost:8082/user/retrieve", {
      method: 'get',
      headers: myHeader
    })
    .then(res => res.json())
    .then(res => {
        console.log("Jeah! =>", res);
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
          Welcome...
        </div>
    );
  }
}

export default Home;
