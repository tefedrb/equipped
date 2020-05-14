import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import MainDisplay from '../MainDisplay';
import CompanyList from '../CompanyList/CompanyList'
import { UserConsumer } from '../UserContext';

const Main = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
`
const CompanyListView = (props) => {
    return (
        <UserConsumer>
            {context => 
                <Main>
                    <Route exact path="/home" render={() =>         
                            <MainDisplay
                                userContext={context}
                                selectedCompany={props.selectedCompany}
                                parentForceMenuDisplay={props.parentForceMenuDisplay} 
                            />   
                        }
                    />
                    <Route exact path="/home" render={() => 
                            <CompanyList
                                userContext={context}
                                getCompanyInfo={props.getCompanyInfo} 
                                parentForceMenuDisplay={props.parentForceMenuDisplay}
                                toggleCreateCompany={props.toggleCreateCompany}
                            />
                        }
                    />  
                </Main>
            }
        </UserConsumer>
    )
}

export default CompanyListView;