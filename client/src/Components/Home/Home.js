import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Route } from 'react-router-dom';
import CompanyView from '../CompanyView/CompanyView';
import ParentNav from '../ParentNav/ParentNav';
import CheckJwt from '../../CheckJwt';
import CompanyListView from './CompanyListView';
import { UserConsumer } from '../UserContext';
import CreateCompanyDropDown from '../DropDownMenu/CreateCompanyDropDown';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../CSS/index.css';

const Home = (props) => {
  const [homeState, updateHomeState] = useState({
    parentForceMenuDisplay: false,
    selectedCompany: null,
    companyViewLoaded: false
  })
  const [dropDownMenuState, toggleDropDownMenu] = useState(false);
 
  // const toggleCreateCompany = () => {
  //   updateHomeState(prevState => ({
  //     ...prevState,
  //     parentForceMenuDisplay: !prevState.parentForceMenuDisplay
  //   }))
  // }

  useEffect(() => {
    if(localStorage.getItem('jwt')){
      CheckJwt(localStorage.getItem('jwt'));
    }
  }, [homeState.selectedCompany])

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
  // parentMenuDisplaySwitch={homeState.parentForceMenuDisplay}

  return (
    <div className="home">
      {!localStorage.getItem('jwt') && <Redirect to="/"/>}
      <ParentNav mainLoaded={checkMainViewIsLoaded()} />

      <UserConsumer>
        { context =>
          <>
            {
              dropDownMenuState &&
                <DropDownMenu
                  dropDownMenuState={dropDownMenuState}
                  toggleDropDownMenu={toggleDropDownMenu}
                  render={toggle => 
                    <CreateCompanyDropDown
                      userContext={context} 
                      toggleDropDownMenu={toggle} 
                    />
                  }
                />
            }

            <Route 
              exact path="/home" 
              render={() =>         
                <CompanyListView
                  selectedCompany={homeState.selectedCompany}
                  toggleDropDownMenu={toggleDropDownMenu} 
                  parentForceMenuDisplay={homeState.parentForceMenuDisplay}
                  getCompanyInfo={getCompanyInfo}  
                />
              }
            />

            <Route 
              path="/home/company" 
              render={({ match }) => 
                <CompanyView userCompany={context.state.userCompany} match={match} />
              }
            />
          </>
        }
      </UserConsumer>
    </div>
  )
}

export default Home;