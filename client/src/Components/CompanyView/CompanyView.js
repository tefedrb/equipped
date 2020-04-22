import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
import CompanyNav from './CompanyNav';
import GetUserCompany from '../FetchData/GetUserCompany';
import EquipmentView from './EquipmentView/EquipmentView';
import InventoryView from '../CompanyView/InventoryView/InventoryView';
import {UserConsumer} from '../UserContext';

const CompanyViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  transition: all .1s ease-in-out;
  justify-content: center;
`
// Inventory. Equipment-list (seperate and fairly robust). 
    // Users-list
    // Wait-list (only for admins)
    // Worry about implementing security for endpoints later
class CompanyView extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      userCompany: null
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.props.loaded("Company View");
    GetUserCompany(localStorage.getItem("jwt")).then(res => {
        if(this._isMounted){
          this.setState({
            userCompany: res
          }) 
        }
      })
    
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
    return (
      <>
        <UserConsumer>
          {context => <CompanyNav userContext={context} />}
        </UserConsumer>
        <CompanyViewContainer>
          <Route 
            path={"/home/company/equipment-view"} 
            render={() => <EquipmentView />}
          />
          <Route 
            path={"/home/company/inventory-view"} 
            render={() => 
              <UserConsumer>
                {context => <InventoryView userContext={context.state}/>}
              </UserConsumer>
            } 
          /> 
        </CompanyViewContainer>
      </>
    );
  }
}

export default CompanyView;
