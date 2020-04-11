import React from 'react';
import '../CSS/App.css';
import styled from 'styled-components';

function MainDisplay(props) {
  // const createMenuDisplayed = props.showCreateCompMenu ? "dull-area" : null;
  const companySelect = props.selectedCompany;
  const userWaitList = props.waitList;
  let joinComp = "";

  const Button = styled.button`
    opacity: ${props.company ? ".5" : "1"};
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
      ${props.company || userWaitList ? "" : "box-shadow: .5px .5px 2.5px #000000"};
      ${props.company || userWaitList ? "" : "background-color: rgba(0,0,0,0.5);"};
    }

    &:active {
      ${props.company ? "" : "background-color: #69cb42;"}
    } 
  `
  // If the user has a WAITLIST# and the SELECTED COMPANY's waitlist
  // matches the WAITLIST
  

  if(companySelect){
    if(userWaitList !== companySelect.waitList.id){
      joinComp = 
        <Button onClick={()=> props.joinWaitList(companySelect.id)}>
          Join Company
        </Button>;
    } else if(props.company){
      joinComp = 
        <Button>
          Join Company
        </Button> 
    } else {
      joinComp = 
        <Button>
          On Wait List
        </Button> 
    }
  }

  return (
    <div className={`main-display`}>
      <h1>{companySelect ? companySelect.name : ""}</h1>
      <h2>{companySelect ? companySelect.type : ""}</h2>
      {companySelect ? joinComp : ""}
    </div>
  );
}

export default MainDisplay;