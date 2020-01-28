import React, {Component} from 'react';
import '../App.css';
import CompanyListItem from './CompanyListItem';

class CompanyList extends Component {
  // This sets up a flag that stops setState from 
  // being executed on an unmounted component
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      companies: null
    }
  }

  componentDidMount(){
    this._isMounted = true;
    if(this.state.companies == null){
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
      fetch("http://localhost:8082/company/list", {
        method: 'get',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(res => {
        if(res.error === "Unauthorized"){
          alert("You have been logged out.")
          localStorage.clear();
          window.location.reload();
        } else if(this._isMounted){
          this.setState({
            companies: res
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
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
        Create Company</button>}
      </div>
    );
  }
}

export default CompanyList;
