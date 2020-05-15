import React from 'react';
import '../CSS/App.css';
import styled from 'styled-components';

const Button = styled.button`
    opacity: ${props => props.userCompany || props.waitList ? ".5" : "1"};
    outline: none;
    height: auto;
    width: auto;
    text-align: center;
    color: white;
    background-color: rgba(0,0,0,0.4);
    box-shadow: 1px 1px 5px #000000;
    border: 2px black solid;
    padding: .5em;
    transition: box-shadow .1s ease-in-out;

    &:hover {
      ${props => props.userCompany || props.waitList ? "" : "box-shadow: .5px .5px 2.5px #000000"};
      ${props => props.userCompany || props.waitList ? "" : "background-color: rgba(0,0,0,0.5);"};
    }

    &:active {
      ${props => props.userCompany || props.waitList ? "" : "background-color: #69cb42;"}
    } 
  `

function MainDisplay(props) {
  const { userCompany, waitList } = props.userContext.state;
  const { joinWaitList, login } = props.userContext;
  const companySelect = props.selectedCompany;
  const companySelectWaitListId = props.selectedCompany ? props.selectedCompany.waitList.id : null;
  const userWaitListId = waitList ? waitList.id : null;

  const joinWaitListThenRefresh = async () => {
    await joinWaitList(companySelect.id).then(res => {
      if(res === "OK"){
        login(localStorage.getItem('jwt'))   
      }
    });
  }

  const buttonOption = (id, otherWaitListId, userCompany) => {

    const btnText = userCompany || id !== otherWaitListId ? "Join Company" : "On Wait List";
    return (
      <Button 
        userCompany={userCompany}
        waitList={id ? id : false} 
        onClick={id !== otherWaitListId ? joinWaitListThenRefresh : null}
      >
        {btnText}
      </Button>
    )
  }

  return (
    <div className={`main-display`}>
      <h1>{companySelect ? companySelect.name : ""}</h1>
      <h2>{companySelect ? companySelect.type : ""}</h2>
      {companySelect ? buttonOption(userWaitListId, companySelectWaitListId, userCompany) : ""}
    </div>
  );
}

export default MainDisplay;