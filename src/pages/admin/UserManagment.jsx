import { useEffect, useState } from "react";
import "../../assets/styles/base.css";

function UserList({ user }) {
    const [dept, setDept] = useState([]);


    useEffect(() => {
        if (user.desg === 'Student' || user.desg === 'Faculty') {
            async function getDept() {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/dept/${user.deptId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setDept(result);

                    return;
                }

                alert('Something went wrong!');
            }

            getDept();
        }
    }, []);

    return (
        <tr className="list-item">
            <td> {`${user.name.firstName} ${user.name.lastName}`} </td>
            <td> {user.desg} </td>
            <td> {dept.deptName} </td>
            <td> <i class="fa-solid fa-pen"></i> </td>
            <td> <i class="fa-solid fa-trash"></i> </td>
        </tr>
    )
}

export default function UserView() {
    const [userList, setList] = useState([]);

    useEffect(() => {
        async function getUserList() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setList(result);
            }
        }

        getUserList();
    }, []);

    return (
        <main>
            <h2>Users</h2>

            <a href="/create-user" className="btn">Add new user</a>
            <tr className="list-item list-title">
                <th>User's Name</th>
                <th>Account type</th>
                <th>Department</th>
                <th>Update</th>
                <th>Remove</th>
            </tr>

            {
                userList.length ?
                    userList.map((user) => (
                        <UserList user={user} />
                    ))
                    : <span>No users found</span>
            }

        </main>
    )
}