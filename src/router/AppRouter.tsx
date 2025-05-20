import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../eresto/pages/Home";
import { Admin } from "../eresto/pages/admin/Admin";
import { Orders } from "../eresto/pages/admin/Orders";
import { Dashboard } from "../eresto/pages/admin/Dashboard";
import { Tables } from "../eresto/pages/admin/tables/Tables";

import { Users } from "../eresto/pages/admin/Users";
import React from 'react';
import PaymentHistory from "../eresto/pages/admin/PaymentHistory";
import { Categories } from "../eresto/pages/admin/Categories";

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
                <Route path="categories" element={<Categories/>} />
                <Route path="payment-history" element={<PaymentHistory/>} />
                <Route path="users" element={<Users/>} />
            </Route>

            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
