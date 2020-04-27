import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import MainDisplay from '../MainDisplay';
import CompanyList from '../CompanyList/CompanyList'
import {UserConsumer} from '../UserContext';

const Main = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
`
const MainView = (props) => {
const {loadedState} = props;

    useEffect(() => {
        props.loaded("Main");
    },[loadedState])

    return (
        <UserConsumer>
            {context => 
                <Main>
                    <Route exact path="/home" render={() =>         
                            <MainDisplay
                                userContext={context}
                                selectedCompany={props.selectedCompany}
                                showCreateCompMenu={props.showCreateCompMenu} 
                            />   
                        }
                    />
                    <Route exact path="/home" render={() => 
                            <CompanyList
                                userContext={context}
                                getCompanyInfo={props.getCompanyInfo} 
                                showCreateCompMenu={props.showCreateCompMenu}
                                toggleCreateCompany={props.toggleCreateCompany}
                            />
                        }
                    />  
                </Main>
            }
        </UserConsumer>
    )
}

export default MainView;