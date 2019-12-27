import React, {Component} from 'react';
import '../App.css';

class CompanyList extends Component {
  constructor(props){
    super(props);
    this.state = {
      companies: null
    }
  }
  componentDidMount(){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.props.jwt}`);
    fetch("http://localhost:8082/company/list", {
      method: 'get',
      headers: myHeaders
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        companies: res
      })
    })
  }
  render(){
    const companies = this.state.companies ? this.state.companies.map((company, index) => {
      return (
        <li key={index}>
          {company.name}
        </li>
      )
    }) : "Loading...";
    return (
      <div className="company-list">
        <ul>
          {companies}
        </ul>
      </div>
    );
  }
}

export default CompanyList
