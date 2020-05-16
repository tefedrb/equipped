import React, { useState, useEffect } from 'react';
import GetCompanyUsersList from '../FetchData/UsersApi/GetCompanyUsersList';
import GetWaitList from '../FetchData/UsersApi/GetWaitList';
import GetCompanyWaitList from '../FetchData/UsersApi/GetCompanyWaitList'
import UpdateUserRole from '../FetchData/UsersApi/UpdateUserRole';
import GetUserOnWaitList from '../FetchData/UsersApi/GetUserOnWaitList';
import ConfirmUserWaitList from '../FetchData/UsersApi/ConfirmUserWaitList';
import styled from 'styled-components';

export const ComponentWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5em;

`
export const UsersListWrap = styled.div`
    border: 2px solid black;
    margin: 1em;
`
export const Ul = styled.ul`
    padding: .5em;
    list-style-type: none;
    background-color: rgba(0,0,0,0.4);
    margin: 0;
    min-width: 11em;
    max-height: 30em;
    font-size: .8em;
    overflow: auto;

    > li {
        border: 2px solid #69cb42;
        padding: .5em;

        > p {
            margin: 1px;
        }
    }
`
export const UserData = styled.p`
    color: white;
`

const ListChoiceBtn = styled.button`
    background-color: ${props => props.listDisplayed ? "rgba(105,203,66,.2)" : "rgba(105,203,66,.8)"};
    box-shadow: ${props => props.listDisplayed ? "0px 1px 2px" : "2px 5px 10px"};
    padding: 1em;
    outline: none;
`

const UsersList = (props) => {
    const [lists, updateLists] = useState({ switch: false, waitList: { users: [] }, usersList: [] });
    const [listDisplay, toggleDisplay] = useState("Company Users");

    const { user, userCompany } = props.userContext.state;
    const userIsAdmin = user && user.userRole.roleType === "ADMIN" ? true : false;

    useEffect(() => {
        let isCancelled = false;
        async function getData(){  
            let usersListRes, waitListRes
            if(lists.usersList.length < 1 || lists.switch){
                usersListRes = await GetCompanyUsersList(localStorage.getItem("jwt"))
            } 
            if(userCompany && userIsAdmin){
                waitListRes = await GetCompanyWaitList(userCompany.id, localStorage.getItem("jwt"));
            }
            if(!isCancelled){
                updateLists(prev => {   
                    return {
                        waitList: waitListRes ? waitListRes : prev.waitList,
                        usersList: usersListRes ? usersListRes : prev.usersList,
                        switch: false
                    }
                })
            }
        }

        getData();

        return () => isCancelled = true;
    }, [lists.waitList.length, userIsAdmin, lists.usersList.length, lists.switch])

    const handleApprove = async (waitListId, username) => {
        const targetUser = await GetUserOnWaitList(username, localStorage.getItem("jwt")); 
        await ConfirmUserWaitList(waitListId, targetUser.id, localStorage.getItem("jwt"));
        updateLists(prev => {
            return ({
                    ...prev,
                    switch: true
                }
            )
        });
    }

    const handleRemove = (waitListId, username) => {
        console.log(waitListId, username)
    }

    const handlePromoteToAdmin = (userId) => {
        console.log(userId);
    }

    const promoteToAdmin = (userId) => {
        return <button onClick={() => handlePromoteToAdmin(userId)}>Promote To Admin</button>
    };

    const waitListBtns = (waitListId, username) => {
        return (
            <div>
                <button onClick={() => handleApprove(waitListId, username)}>Approve</button>
                <button onClick={() => handleRemove(waitListId, username)}>Remove</button>
            </div>
        )
    }

    const displayWaitOrUsersList = (choice, promoteToAdmin) => {
        let list;

        if(choice === "Company Users"){
            list = [...lists.usersList];
        } else if(choice === "Wait List" && lists.waitList){
            list = [...lists.waitList.users];
        }

        return list.map((user, idx) => {
                const username = user.username                
                const title = user.title
                const roleType = user.userRole.roleType
                return (
                    <li key={idx}>
                        <p>Username:</p>
                        <UserData>{username}</UserData>
                        <p>Title:</p>
                        <UserData>{title}</UserData>
                        {choice === "Company Users" && userIsAdmin && roleType !== "ADMIN" ? promoteToAdmin(user.id) : ""}
                        {choice === "Wait List" && userIsAdmin && roleType !== "ADMIN" ? waitListBtns(lists.waitList.id, username) : ""}
                    </li>
                )
            }
        )  
    }

    const toggleListDisp = (e) => {
        toggleDisplay(e.target.innerText); 
    }

    return (
        <ComponentWrap>
            <p>| <ListChoiceBtn listDisplayed={listDisplay === "Company Users"} onClick={toggleListDisp}>Company Users</ListChoiceBtn> | {userIsAdmin ? <ListChoiceBtn listDisplayed={listDisplay === "Wait List"} onClick={toggleListDisp}>Wait List</ListChoiceBtn> : ""} |</p>
            
            <UsersListWrap>
                <Ul>
                    {displayWaitOrUsersList(listDisplay, promoteToAdmin)}
                </Ul>
            </UsersListWrap>
        </ComponentWrap>
    )
}

export default UsersList;