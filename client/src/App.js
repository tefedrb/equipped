import React, {Component} from 'react';
import './App.css';
import SignUp from './Components/SignUp';

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <SignUp />
      </div>
    );
  }
}

export default App;
