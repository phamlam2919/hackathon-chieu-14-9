import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [newUsers, setNewUser] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCreateUser = (e) => {
        e.preventDefault();

        if (!newUsers.email || !newUsers.password) {
            setErrors({ message: "Email và mật khẩu không được để trống" });
            return;
        }

        axios
            .post(`http://localhost:3000/api/v1/auth/signin`, newUsers)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                    if (res.data.role === 1) {
                        navigate("/admin");
                    } else {
                        navigate("/users");
                    }
                } else {
                    alert("Đăng nhập thất bại");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div
                className="container1"
                style={{ height: "100vh", width: "60%", marginLeft: "20%" }}
            >
                <h1>Đăng nhập</h1>
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={handleInputChange}
                                value={newUsers.email}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={handleInputChange}
                                value={newUsers.password}
                            />
                        </div>
                        {errors.message && (
                            <div className="text-danger">{errors.message}</div>
                        )}
                        <button
                            onClick={handleCreateUser}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
