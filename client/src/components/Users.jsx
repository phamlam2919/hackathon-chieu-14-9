import React, { useEffect, useState } from "react";
import axios from "axios";
function Users() {
    const [users, setUsers] = useState([]);
    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        listUsers();
    }, []);
    return (
        <div>
            <h1>USERS</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Công Việc</th>
                        {/* <th scope="col" colSpan={2}>
                            Action
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((e, i) => (
                        <tr key={i}>
                            <th scope="row">{e.users_id}</th>
                            <td>{e.name}</td>
                            {/* <td>
                                <button className="btn btn-info">Update</button>
                                <button className="btn btn-danger">
                                    Delete
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
