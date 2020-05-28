import React, { Component } from 'react';
import CompanyListItem from './CompanyListItem';
import GetCompanyList from '../FetchData/UsersApi/GetCompanyList';
import {Link} from 'react-router-dom';

class CompanyList extends Component {
  // This sets up a flag that stops setState from 
  // being executed on an unmounted component
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      companies: []
    }
  }

  componentDidMount(){
    this._isMounted = true;
    if(this.state.companies.length < 1 && localStorage.getItem('jwt')){
      this.populateList();
    }
  }

  populateList = async () => {
     await GetCompanyList().then(res => {
      if(res.error && res.error === "Unauthorized"){
        this.props.logout();
      } else if(this._isMounted){
        this.setState({
          companies: res
        });
      }
     })
  }

  componentDidUpdate(prevProps){
    // This is here to update the list if user creates a new company
    // might want to just implement a refresh button to avoid unnecessary renders
    if(prevProps.userContext.state.userCompany !== this.props.userContext.state.userCompany){
      this.populateList();
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
      const buttonStyle = {opacity: .5};
      const companies = this.state.companies ?
        this.state.companies.map((company, index) => {
          return (
            <CompanyListItem
              getCompanyInfo={this.props.getCompanyInfo} 
              company={company} 
              key={index}
            />
          )
        }) : "Loading...";

    const showDropDownMenu = 
      <button 
        style={this.props.userContext.state.userCompany && buttonStyle} 
        onClick={() => this.props.toggleDropDownMenu(prev => !prev)}>
        Create Company
      </button>

    return (
      <div className={`company-list`}>
        <h1>Company List</h1>
        <div className='company-list-container'>
          {companies}
        </div>
        {showDropDownMenu}
      </div>
    );

  }
}

export default CompanyList;