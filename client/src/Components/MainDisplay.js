import React from 'react';
import '../CSS/App.css';
import styled from 'styled-components';

function MainDisplay(props) {
    const createMenuDisplayed = props.showCreateMenu ? "dull-area" : null;
    const company = props.selectedCompany;
    const Button = styled.button`
      outline: none;
      display: flex;
      flex-direction: column;
      height: auto;
      width: auto;
      text-align: center;
      color: white;
      background-color: rgba(0,0,0,0.4);
      border: 2px black solid;
      padding: .5em;
      transition: box-shadow .1s ease-in-out;

      &:hover {
        box-shadow: 1px 1px 5px #000000;
        background-color: rgba(0,0,0,0.5);
      }

      &:active {
        background-color: #69cb42;
      } 
    `
    const joinComp = <Button onClick={()=>props.joinWaitList(company.id)}>
                        <span>Join Company</span>
                    </Button>;
  return (
    <div className={`main-display ${createMenuDisplayed}`}>
      <h1>{company ? company.name : ""}</h1>
      <h2>{company ? company.type : ""}</h2>
      {company ? joinComp : ""}
    </div>
  );
}

export default MainDisplay;