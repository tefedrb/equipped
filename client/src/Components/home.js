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
