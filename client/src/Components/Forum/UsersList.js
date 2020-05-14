import React, { useState, useEffect } from 'react';
import GetCompanyUsersList from '../FetchData/UsersApi/GetCompanyUsersList';
import GetWaitList from '../FetchData/UsersApi/GetWaitList';
import UpdateUserRole from '../FetchData/UsersApi/UpdateUserRole';
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

    const { user, waitList } = props.userContext.state;
    const userIsAdmin = user && user.userRole.roleType === "ADMIN" ? true : false;

    useEffect(() => {
        let isCancelled = false;
        let usersListRes, waitListRes;
        async function getData(){  
            if(lists.usersList.length < 1){
                usersListRes = await GetCompanyUsersList(localStorage.getItem("jwt"))
            } 
            if(userIsAdmin){
                waitListRes = await GetWaitList(localStorage.getItem("jwt"));
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
    }, [lists.waitList, user, waitList, userIsAdmin])


    // const waitList = props.userContext.state.user.userRole.type === "ADMIN" ? <span>Wait List |</span> : "";

    const handleApprove = async () => {
        await ConfirmUserWaitList(waitListId, userId);
    }

    const handleRemove = () => {

    }

    const handlePromoteToAdmin = (userId) => {

    }

    const promoteToAdmin = <button onClick={() => handlePromoteToAdmin(userId)}>Promote To Admin</button>;

    const displayWaitOrUsersList = (choice, promoteToAdmin) => {
        let list;
        let waitListBtns = "";
        
        if(user.id && userIsAdmin){
            waitListBtns = (
                <div>
                    <button onClick={handleApprove}>Approve</button>
                    <button onClick={handleRemove}>Remove</button>
                </div>
            )
        }

        if(choice === "usersList"){
            list = [...lists.usersList];
        } else if(choice === "waitList"){
            list = [...lists.waitList];
        }

        return list.map((user, idx) => 
            <li key={idx}>
                <p>Username:</p>
                <UserData>{user[0]}</UserData>
                <p>Title:</p>
                <UserData>{user[1]}</UserData>
                {choice === "usersList" && userIsAdmin ? promoteToAdmin : ""}
                {choice === "usersList" ? "" : waitListBtns}
            </li>
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