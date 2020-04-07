import React, {Component} from 'react';
import styled from 'styled-components';

const Section = styled.section`
  height: 100%;
  width: 100%;
  margin: 0;

  transition: all .2s ease-in-out;
`

class CompanyView extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      company: null,
      type: null
    }
  }

  componentDidMount(){
    this._isMounted = true;
    // console.log(this.props);
    //   fetch("http://localhost:8080/users-api/company/userCompany", {
    //     method: 'get',
    //     headers:{
    //       'Content-Type' : 'application/json',
    //       'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
    //     }
    //   })
    //   .then(res => res.json())
    //   .then(res =>{
    //     // Display company of user
    //     console.log(res);
    //     this.setState({
    //       company: res.name,
    //       type: res.type
    //     });
    //   })
    //   .catch(error => 
    //     console.log("Can't find user compnay: ", error)
    //   )
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }

  render(){
    return(
      <Section>
        <div id="company-views">
          <nav>
            <h1><span>Company: </span>{this.props.company || "No Company"}</h1>
          </nav>
          <div>

          </div>
        </div>
      </Section>
    );
  }
}

export default CompanyView;
