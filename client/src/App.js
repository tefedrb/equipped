import React, {Component} from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      jwt: null,
    }
    this.updateJwt = this.updateJwt.bind(this);
  }

  updateJwt(token){
    this.setState({
      jwt: token
    })
  }

  render(){
    return (
      <div className="App">
          <Router>
            <Route
              exact path="/"
              component={() => <SignUp updateJwt={this.updateJwt}
                jwt={this.state.jwt} />}
            />
            <Route
              exact path="/"
              component={() => <LogIn updateJwt={this.updateJwt}
                jwt={this.state.jwt} />}
            />
            <Route
              path="/home"
              component={() => <Home jwt={this.state.jwt} />}
            />
          </Router>
      </div>
    );
  }
}

export default App;
