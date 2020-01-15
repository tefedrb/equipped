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
    console.log("Company List MOUNTED");
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    fetch("http://localhost:8082/company/list", {
      method: 'get',
      headers: myHeaders,
    })
    .then(res => res.json())
    .then(res => {
      console.log('CompanyList FETCH')
      this.setState({
        companies: res
      })
    })
  }

  componentWillUnmount(){
    console.log("CompanyList UNMOUNTED");
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
        <div className='company-list-container'>
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
