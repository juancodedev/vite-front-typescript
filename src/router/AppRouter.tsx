import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../eresto/pages/Home";
import { Admin } from "../eresto/pages/admin/Admin";
import { Orders } from "../eresto/pages/admin/Orders";
import { Dashboard } from "../eresto/pages/admin/Dashboard";
import { Tables } from "../eresto/pages/admin/Tables";
import { Reports } from "../eresto/pages/admin/Reports";
import { Users } from "../eresto/pages/admin/Users";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/home" element={<Home/>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Admin/>}>
                <Route index element={<Dashboard/>} />
                <Route path="orders" element={<Orders/>} />
                <Route path="tables" element={<Tables/>} />
                <Route path="reports" element={<Reports/>} />
                <Route path="users" element={<Users/>} />
            </Route>

            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
