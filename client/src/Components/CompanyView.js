import React, {Component} from 'react';
import styled from 'styled-components';

const Section = styled.section`
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
      company: null,
      type: null
    }
  }

  componentDidMount(){
    this._isMounted = true;
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
    const companyName = this.props.userCompany ? this.props.userCompany.name : "No Company";
    return(
      <Section>
        <div id="company-views">
          <nav>
            <h1><span>Company: </span>{companyName}</h1>
          </nav>
          <div>

          </div>
        </div>
      </Section>
    );
  }
}

export default CompanyView;
