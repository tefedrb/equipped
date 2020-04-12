import React, {Component} from 'react';
import styled from 'styled-components';
import CompanyNav from './CompanyNav';
import GetUserCompany from '../FetchData/GetUserCompany';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  align-self: start;
  transition: all .2s ease-in-out;
`

class CompanyView extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      userCompany: null
    }
  }

  componentDidMount(){
    this._isMounted = true;
    GetUserCompany().then(res => {
      this.setState({
        userCompany: res
      }) 
    })
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
    return (
      <Section>
        <CompanyNav userCompany={this.props.userCompany} />
      </Section>
    );
  }
}

export default CompanyView;
