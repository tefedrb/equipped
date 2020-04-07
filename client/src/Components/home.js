import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../CSS/App.css';
import CompanyList from './CompanyList';
import MainDisplay from './MainDisplay';
import CreateCompanyMenu from './CreateCompanyMenu';
import {Route} from 'react-router-dom';
import CompanyView from './CompanyView';
import InnerNav from './InnerNav/InnerNav';

class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      company: null,
      type: null,
      showCreateMenu: false,
      selectedCompany: null
    }
  }
 
  toggleCreateCompany = () => {
    /* Might want to create a conditional here that checks
     to see if the user already has a company?? */
    this.setState(prevState => ({
      showCreateMenu: !prevState.showCreateMenu
    }))
  }

  componentDidMount(){
    this._isMounted = true;
    console.log(this.props);
      fetch("http://localhost:8080/users-api/company/userCompany", {
        method: 'get',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then(res => res.json())
      .then(res =>{
        // Display company of user
        console.log(res);
        if(res.id != null){
          this.setState({
            company: res.name,
            type: res.type
          });
        }
      })
      .catch(error => 
        console.log("Can't find user compnay: ", error)
      )
  }

  getCompanyInfo = (id) => {
    fetch("http://localhost:8080/users-api/company/" + id, {
      method: 'get',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res, " In getCompanyInfo(): Home component");
      this.setState({
        selectedCompany: res
      })
    })
  }

  // Move create company menu into company list?
  render(){
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <InnerNav />
        <CreateCompanyMenu 
          toggleCreateCompany={this.toggleCreateCompany} 
          showCreateMenu={this.state.showCreateMenu}
          createCompany={this.createCompany}
          getUserCompany={this.props.getUserCompany}
        />
        <main className="home-main">
          <Route exact path="/home">
            <MainDisplay
            selectedCompay={this.state.getCompanyinfo}
              showCreateMenu={this.state.showCreateMenu} 
            /> 
          </Route>
          <Route exact path="/home">
            <CompanyList
              getCompanyInfo={this.getCompanyInfo}
              logout={this.logOut} 
              showCreateMenu={this.state.showCreateMenu}
              toggleCreateCompany={this.toggleCreateCompany} 
            />
          </Route>
          <Route path="/home/company">
            <CompanyView 
              company={this.state.company}
              companyType={this.state.companyType}
            />
          </Route>
        </main> 
      </div>
    )
  }
}

export default Home;
