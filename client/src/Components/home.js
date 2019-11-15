import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.jwt){
      return (
        <Redirect to="/" />
      )
    }
    return(
        <div>
          Welcome !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </div>
    );
  }
}

export default Home;
