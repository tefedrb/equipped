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
`
export const Ul = styled.ul`
    padding: .5em;
    list-style-type: none;
    background-color: rgba(0,0,0,0.4);
    margin: 0;
    min-width: 10em;
    max-height: 30em;
    font-size: .8em;

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
    background-color: rgba(105,203,66,.5);
    padding: 1em;
`

const UsersList = (props) => {
    const [lists, updateLists] = useState({ waitList: [], usersList: [] });

    const { user, userCompany } = props.userContext.state;
    console.log(props.userContext.state, "STATE!")
    const userIsAdmin = user && user.userRole.roleType === "ADMIN" ? true : false;

    useEffect(() => {
        let isCancelled = false;
        let usersListRes, waitListRes;
        async function getData(){  
            if(lists.usersList.length < 1){
                usersListRes = await GetCompanyUsersList(localStorage.getItem("jwt"))
            } 
            if(userCompany && userIsAdmin){
                waitListRes = await GetCompanyWaitList(userCompany.id, localStorage.getItem("jwt"));
            }
            if(!isCancelled){
                updateLists(prev => {   
                    return {
                        waitList: waitListRes ? waitListRes : prev.waitList,
                        usersList: usersListRes ? usersListRes : prev.usersList
                    }
                })
            }
        }

        getData();

        return () => isCancelled = true;
    }, [lists.waitList.length, userIsAdmin])


    // const waitList = props.userContext.state.user.userRole.type === "ADMIN" ? <span>Wait List |</span> : "";

    const handleApprove = async (waitListId, username) => {
        // If return is successful remove user - force refresh
        // GET USER BY USERNAME
        const targetUser = await GetUserOnWaitList(username);
        await ConfirmUserWaitList(waitListId, targetUser.id);
        
    }

    const handleRemove = (waitListId, username) => {
        console.log(waitListId, username)
    }

    const handlePromoteToAdmin = (userId) => {
        console.log(userId);
    }

    const promoteToAdmin = <button onClick={() => handlePromoteToAdmin(1)}>Promote To Admin</button>;

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
        let waitListBtns = "";


        if(choice === "usersList"){
            list = [...lists.usersList];
        } else if(choice === "waitList"){
            list = [...lists.waitList.users];
        }

        return list.map((user, idx) => {
                const username = user[0];
                const title = user[1];
                return (
                    <li key={idx}>
                        <p>Username:</p>
                        <UserData>{username}</UserData>
                        <p>Title:</p>
                        <UserData>{title}</UserData>
                        {choice === "usersList" && userIsAdmin ? promoteToAdmin : ""}
                        {choice === "usersList" ? "" : waitListBtns(lists.waitList.id, username)}
                    </li>
                )
            }
        )  
    }

    return (
        <ComponentWrap>
            <p>| <ListChoiceBtn>Company Users</ListChoiceBtn> | {userIsAdmin ? <ListChoiceBtn>Wait List</ListChoiceBtn> : ""}</p>
            
            <UsersListWrap>
                <Ul>
                    {displayWaitOrUsersList("usersList", promoteToAdmin)}
                </Ul>
            </UsersListWrap>
        </ComponentWrap>
    )
}

export default UsersList;