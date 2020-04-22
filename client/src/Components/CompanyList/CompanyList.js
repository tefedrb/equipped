import React, {Component} from 'react';
import CompanyListItem from './CompanyListItem';
import GetCompanyList from '../FetchData/GetCompanyList';

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
    if(prevProps.userHasCompany !== this.props.userHasCompany){
      this.populateList();
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
      const buttonStyle = {opacity: .5}

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
    
    // const createMenuDisplayed = this.props.showCreateCompMenu ? "dull-area" : null;
    
    // buttonDisplay renders if the 
    const buttonDisplay = 
    <button 
      style={this.props.userHasCompany ? buttonStyle : null} 
      onClick={this.props.userHasCompany ? null : this.props.toggleCreateCompany}>
      Create Company
    </button>

    return (
      <div className={`company-list`}>
        <h1>Company List</h1>
        <div className='company-list-container'>
          {companies}
        </div>
        {buttonDisplay}
      </div>
    );

  }
}

export default CompanyList;
