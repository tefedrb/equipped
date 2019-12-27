import React, {Component} from 'react';
import '../App.css';

class Inventory extends Component {
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
    return (
      <div>
        
      </div>
    );
  }
}

export default Inventory;
