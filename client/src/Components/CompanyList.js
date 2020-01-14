import React, {Component} from 'react';
import '../App.css';
import CompanyListItem from './CompanyListItem';

class CompanyList extends Component {
  constructor(props){
    super(props);
    this.state = {
      companies: null,
      displayCreateMenu: false
    }
  }

  componentDidMount(){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.props.jwt}`);
    fetch("http://localhost:8082/company/list", {
      method: 'get',
      headers: myHeaders,
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        companies: res
      })
    })
  }

  render(){
    const companies = this.state.companies ?
    this.state.companies.map((company, index) => {
      return (
        <CompanyListItem company={company} key={index} />
      )
    }) : "Loading...";
    const createMenuDisplayed = this.props.showCreateMenu ? "dull-area" : null;
    return (
      <div className={`company-list ${createMenuDisplayed}`}>
        <h1>Company List</h1>
        <div>
          {companies}
        </div>
        {!createMenuDisplayed && <button onClick={this.props.toggleCreateCompany}>
        Create Company
        </button>}
      </div>
    );
  }
}

export default CompanyList;
