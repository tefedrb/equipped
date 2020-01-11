import React from 'react';
import styled from 'styled-components';

const Div = styled.div `
    display: flex;
    background-color: white;
    color: black;
    border-radius: 5px;
    flex-grow: .66;
    height: 70%;
    margin: 5%;
`
const CreateCompany = (props) => {
    const showCreateMenu = props.showCreateMenu ? "show-menu" : null;
    return  (
        <div className={`create-company-menu ${showCreateMenu}`}>
           <Div>
               <form>
                   <input></input>
                   <input></input>
                   <textarea></textarea>
               </form>
           </Div>
        </div>
    )
};

export default CreateCompany;