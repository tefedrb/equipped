import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import CompanyNav from './CompanyNav';
// import GetUserCompany from '../FetchData/UsersApi/GetUserCompany';
import EquipmentView from './EquipmentView/EquipmentView';
import InventoryView from '../CompanyView/InventoryView/InventoryView';
import { UserConsumer } from '../UserContext';
import Forum from '../Forum/Forum';

const CompanyViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  transition: all .1s ease-in-out;
  justify-content: center;
  font-family: ${props => props.theme.fontFam};
`
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
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
    return (
        <UserConsumer>
          {context => 
            <>
              <CompanyNav userContext={context} userCompany={context.state.userCompany} />
            
              <CompanyViewContainer>
                <Route 
                  exact path={`${this.props.match.path}`}
                  render={() => this.props.userCompany && this.props.userCompany.id ? <Forum userContext={context} /> : ""} 
                />

                <Route 
                  path={`${this.props.match.path}/equipment-view`} 
                  render={() => <EquipmentView />}
                />

                <Route 
                  path={"/home/company/inventory-view"} 
                  render={({ match }) => 
                    <InventoryView 
                      match={match} 
                      refreshInventory={context.refreshInventory} 
                      userContext={context.state}
                    />
                  }
                /> 
              </CompanyViewContainer>
            </>
          }
        </UserConsumer>
    );
  }
}

export default CompanyView;
