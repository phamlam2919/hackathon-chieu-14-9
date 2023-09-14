import React, { useEffect, useState } from "react";
import axios from "axios";
function Admin() {
    const [users, setUsers] = useState([]);
    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    const [newTodo, setNewTodo] = useState("");
    const addTodo = async () => {
        try {
            await axios
                .post("http://localhost:3000/api/v1/users/", {
                    name: newTodo,
                    status: "uncomplete",
                })
                .then((res) => {
                    setNewTodo("");
                    listUsers();
                });
        } catch (error) {
            console.error(error);
        }
    };

    const [editUser, setEditUser] = useState({
        users_id: null,
        name: "",
    });
    const handleEdit = (user) => {
        setEditUser({
            users_id: user.users_id,
            name: user.name,
        });
    };

    const handleUpdateUser = () => {
        axios
            .put(
                `http://localhost:3000/api/v1/users/${editUser.users_id}`,
                editUser
            )
            .then((res) => {
                console.log(res.data);
                listUsers();
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/api/v1/users/${id}`)
            .then((res) => {
                setUsers(res.data.user);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        listUsers();
    }, []);
    return (
        <div>
            <h1>ADMIN</h1>
            <div>
                <input
                    onChange={(e) => setNewTodo(e.target.value)}
                    type="text"
                />
                <button onClick={addTodo}>Thêm Công Việc</button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Công Việc</th>
                        <th scope="col" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((e, i) => (
                        <tr key={i}>
                            <th scope="row">{e.users_id}</th>
                            <td>{e.name}</td>
                            <td>
                                <>
                                    <button
                                        onClick={() => handleEdit(e)}
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Update
                                    </button>
                                    <div
                                        className="modal fade"
                                        id="exampleModal"
                                        tabIndex={-1}
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5
                                                        className="modal-title"
                                                        id="exampleModalLabel"
                                                    >
                                                        Update
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    />
                                                </div>
                                                <div className="modal-body">
                                                    <input
                                                        value={editUser.name}
                                                        name="name"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setEditUser({
                                                                ...editUser,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        onClick={
                                                            handleUpdateUser
                                                        }
                                                        type="button"
                                                        className="btn btn-primary"
                                                    >
                                                        Save changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>

                                <button
                                    onClick={() => handleDelete(e.users_id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
