import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import CreateCompanyMenu from '../CreateCompanyMenu';
import {Route} from 'react-router-dom';
import CompanyView from '../CompanyView/CompanyView';
import InnerNav from '../InnerNav/InnerNav';
import CheckJwt from '../../CheckJwt';
import MainView from './MainView';
import {UserConsumer} from '../UserContext';


class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      showCreateCompMenu: false,
      selectedCompany: null,
      companyViewLoaded: false,
      sectionLoaded: null
    }
  }
 
  toggleCreateCompany = () => {
    this.setState(prevState => ({
      showCreateCompMenu: !prevState.showCreateCompMenu
    }))
  }

  componentDidMount(){
    this._isMounted = true;
    console.log("Home mounted");
    if(localStorage.getItem('jwt')){
      CheckJwt(localStorage.getItem('jwt'));
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
    console.log("home unmount")
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

  sectionLoaded = (loaded) => {
    this.setState({
      sectionLoaded: loaded
    })
  }

  // Move create company menu into company list?
  render(){
    return (
      <div className="home">
        {!localStorage.getItem('jwt') && <Redirect to="/"/>}
        <InnerNav loaded={this.state.sectionLoaded} />
        <UserConsumer>
          { context =>
            <CreateCompanyMenu 
              userContext={context}
              toggleCreateCompany={this.toggleCreateCompany} 
              showCreateCompMenu={this.state.showCreateCompMenu}
              setUserCompany={this.props.setUserCompany}
            />
          }
        </UserConsumer>

        <Route 
          exact path="/home" 
          render={() => 
            <MainView
              loaded={this.sectionLoaded}
              selectedCompany={this.state.selectedCompany}
              toggleCreateCompany={this.toggleCreateCompany} 
              showCreateCompMenu={this.state.showCreateCompMenu}
              getCompanyInfo={this.getCompanyInfo}  
            />
          }
        />

        <Route 
          path="/home/company" 
          render={() => <CompanyView loaded={this.sectionLoaded} />}
        />
      </div>
    )
  }
}

export default Home;
