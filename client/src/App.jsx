import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import Admin from "./components/Admin";
function App() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
