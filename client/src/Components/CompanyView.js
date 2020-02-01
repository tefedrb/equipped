import React, {Component} from 'react';
import styled from 'styled-components';

const Div = styled.div`
.user-inventory 
  display: flex;
  height: 90%;
  flex-grow: 5;
  flex-direction: column;
  margin: 3%;
  background-color: rgba(255,255,255,0.4);
  transition: all .2s ease-in-out;
`

class CompanyView extends Component{
  // constructor(props){
  //   super(props);
  // }

  componentDidMount(){
      fetch("http://localhost:8082/company/userCompany", {
        method: 'get',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then(res => res.json())
      .then(res =>{
        // Display company of user
      })
      .catch(error => 
        console.log("Can't find user compnay: ", error)
      )
    }

  render(){
    return(
      <Div>
        
      </Div>
    );
  }
}

export default CompanyView;
