import React from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import MainDisplay from '../MainDisplay';
import CompanyList from '../CompanyList/CompanyList'

const Main = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
`
const MainView = (props) => {
    return (
        <Main>
            <Route exact path="/home" render={() => 
                <MainDisplay
                    waitList={props.waitListId}
                    joinWaitList={props.joinWaitList}
                    userCompany={props.userCompany}
                    selectedCompany={props.selectedCompany}
                    showCreateCompMenu={props.showCreateCompMenu} 
                />}
            />
            <Route exact path="/home" render={() => 
                <CompanyList
                    getCompanyInfo={props.getCompanyInfo}
                    logout={props.logOut}
                    userHasCompany={props.userHasCompany} 
                    showCreateCompMenu={props.showCreateCompMenu}
                    toggleCreateCompany={props.toggleCreateCompany} 
                />}
            />  
        </Main>
    )
}

export default MainView;