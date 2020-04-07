import React, {Component} from 'react';
import '../CSS/App.css';

class MainDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInventory: null
    }
  }

  componentDidMount(){
    // Here we will make a call to the users inventory
  }

  render(){
    const createMenuDisplayed = this.props.showCreateMenu ? "dull-area" : null;
    return (
      <div className={`user-inventory ${createMenuDisplayed}`}>
        <h1></h1>
      </div>
    );
  }
}

export default MainDisplay;
