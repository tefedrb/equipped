import React from 'react';
import styled from 'styled-components';

const FlexWrap = styled.section `
    display: "flex",
    flexDirection: "column",
    height: "4em"
`

const UserDisplay = (props) => {
    const { user, userCompany, waitList } = props.userContext.state;

    return (
        <FlexWrap>
            <div>
                <span style={{color: "white"}}>Username: </span>{user ? user.username : ""}
            </div>
            <div>
                <span style={{color: "white"}}>Title: </span>{user ? user.title : ""}
            </div>
            <div>
                <span style={{color: "white"}}>
                    {waitList && waitList.id ? "On Wait List: " : "Company: "}
                </span>
                {userCompany && userCompany.id ? userCompany.name : waitList && waitList.companyName ? waitList.companyName : ""}
            </div>
        </FlexWrap>
    )
}

export default UserDisplay;