import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Route } from 'react-router-dom';
import CompanyView from '../CompanyView/CompanyView';
import ParentNav from '../ParentNav/ParentNav';
import CheckJwt from '../../CheckJwt';
import MainView from './MainView';
import { UserConsumer } from '../UserContext';
import CreateCompanyDropDown from '../DropDownMenu/CreateCompanyDropDown';

class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      parentForceMenuDisplay: false,
      selectedCompany: null,
      companyViewLoaded: false,
      sectionLoaded: null,
      mainView: this.props.match.isExact
    }
  }
 
  toggleCreateCompany = () => {
    this.setState(prevState => ({
      ...prevState,
      parentForceMenuDisplay: !prevState.parentForceMenuDisplay
    }))
  }

  componentDidMount(){
    this._isMounted = true;
    if(localStorage.getItem('jwt')){
      CheckJwt(localStorage.getItem('jwt'));
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
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
      console.log(res);
      this.setState({
        selectedCompany: res
      })
    })
  }

  checkMainViewIsLoaded = () => {
    const { isExact } = this.props.match;
    return isExact ? true : false;
  }

  // Move create company menu into company list?
  render(){
    console.log("home (parent) re-render")
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <ParentNav mainLoaded={this.checkMainViewIsLoaded()} />

        <UserConsumer>
          { context =>
            <DropDownMenu
              parentMenuDisplaySwitch={this.state.parentForceMenuDisplay}
              toggleParentMenuSwitch={this.toggleCreateCompany}
              render={display => 
                <CreateCompanyDropDown 
                  displayMenu={display} 
                  userContext={context}
                />
              }
            />
          }
        </UserConsumer>

        <Route 
          exact path="/home" 
          render={() =>         
            <MainView
              selectedCompany={this.state.selectedCompany}
              toggleCreateCompany={this.toggleCreateCompany} 
              parentForceMenuDisplay={this.state.parentForceMenuDisplay}
              getCompanyInfo={this.getCompanyInfo}  
            />
          }
        />

        <Route 
          path="/home/company" 
          render={({ match }) => 
            <CompanyView match={match} loaded={this.sectionLoaded} />
          }
        />
      </div>
    )
  }
}

export default Home;
