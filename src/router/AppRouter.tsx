import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../eresto/pages/Home";
import { Admin } from "../eresto/pages/admin/Admin";


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/admin" element={<Admin/>} />


            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
