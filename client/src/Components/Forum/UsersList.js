import React, {useState, useEffect} from 'react';
import GetCompanyUsersList from '../FetchData/UsersApi/GetCompanyUsersList';
import styled from 'styled-components';

const ComponentWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5em;

`
const UsersListWrap = styled.div`
    border: 2px solid black;
`
const Ul = styled.ul`
    padding: .5em;
    list-style-type: none;
    background-color: rgba(0,0,0,0.4);
    margin: 0;
    min-width: 10em;
    max-height: 30em;

    > li {
        border: 2px solid #69cb42;
        padding: .5em;

        > p {
            margin: 1px;
        }
    }
`
const UserData = styled.p`
    color: white;
`
const UsersList = () => {
    const [users, updateUsers] = useState([]);

    useEffect(() => {
        let isCancelled = false;
        if(users.length < 1){
            GetCompanyUsersList(localStorage.getItem("jwt"))
                .then(res => {
                    if(!isCancelled){
                        updateUsers(res);
                    }
                });
        }
        return () => isCancelled = true;
    }, [users])

    return (
        <ComponentWrap>
            <p>Company Users</p>
            <UsersListWrap>
                <Ul>
                    {users.map((user, idx) =>  
                        <li key={idx}>
                            <p>Username:</p>
                            <UserData>{user[0]}</UserData>
                            <p>Title:</p>
                            <UserData>{user[1]}</UserData>
                        </li>
                    )}
                </Ul>
            </UsersListWrap>
        </ComponentWrap>
    )
}

export default UsersList;