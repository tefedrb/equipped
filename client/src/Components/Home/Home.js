import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Route, useHistory } from 'react-router-dom';
import CompanyView from '../CompanyView/CompanyView';
import ParentNav from '../ParentNav/ParentNav';
import CheckJwt from '../../CheckJwt';
import CompanyListView from './CompanyListView';
import { UserConsumer } from '../UserContext';
import CreateCompanyDropDown from '../DropDownMenu/CreateCompanyDropDown';

const Home = (props) => {

  const [homeState, updateHomeState] = useState({
    parentForceMenuDisplay: false,
    selectedCompany: null,
    companyViewLoaded: false,
    mainView: props.match.isExact
  })
 
  const toggleCreateCompany = () => {
    this.setState(prevState => ({
      ...prevState,
      parentForceMenuDisplay: !prevState.parentForceMenuDisplay
    }))
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')){
      CheckJwt(localStorage.getItem('jwt'));
    }
  }, [homeState.selectedCompany])
  // componentDidMount(){
  //   this._isMounted = true;
  //   if(localStorage.getItem('jwt')){
  //     CheckJwt(localStorage.getItem('jwt'));
  //   }
  // }

  // componentWillUnmount(){
  //   this._isMounted = false;
  // }

  const getCompanyInfo = (id) => {
    fetch("http://localhost:8080/users-api/company/" + id, {
      method: 'get',
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      updateHomeState(prev => {
        return {
          ...prev,
          selectedCompany: res
        }
      })
    })
  }

  const checkMainViewIsLoaded = () => {
    const { isExact } = props.match;
    return isExact ? true : false;
  }

  // Move create company menu into company list?
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <ParentNav mainLoaded={checkMainViewIsLoaded()} />

        <UserConsumer>
          { context =>
          <>
            <DropDownMenu
              parentMenuDisplaySwitch={homeState.parentForceMenuDisplay}
              toggleParentMenuSwitch={toggleCreateCompany}
              render={display => 
                <CreateCompanyDropDown 
                  displayMenu={display} 
                  userContext={context}
                />
              }
            />
          

            <Route 
              exact path="/home" 
              render={() =>         
                <CompanyListView
                  selectedCompany={homeState.selectedCompany}
                  toggleCreateCompany={homeState.toggleCreateCompany} 
                  parentForceMenuDisplay={homeState.parentForceMenuDisplay}
                  getCompanyInfo={getCompanyInfo}  
                />
              }
            />

            <Route 
              path="/home/company" 
              render={({ match, location }) => 
                <CompanyView location={location} userCompany={context.state.userCompany} match={match} />
              }
            />
          </>
          }
        </UserConsumer>
      </div>
    )
}

export default Home;