import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../eresto/pages/Home";
import { Admin } from "../eresto/pages/admin/Admin";
import AdminHome from "../eresto/pages/admin/AdminHome";
import { Orders } from "../eresto/pages/admin/Orders";
import { Dashboard } from "../eresto/pages/admin/Dashboard";
import { Tables } from "../eresto/pages/admin/tables/Tables";

import Users from "../eresto/pages/admin/Users";
import React from 'react';
import PaymentHistory from "../eresto/pages/admin/PaymentHistory";
import { Categories } from "../eresto/pages/admin/Categories";
import Products from "../eresto/pages/admin/Products";
import Login from "../eresto/pages/Login";
import TableSelected from "../eresto/pages/TableSelected";


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home onSelect={function (): void {
                throw new Error("Function not implemented.");
            } }/>} />
            <Route path="/home/table" element={<TableSelected />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Admin/>}>
                <Route index element={<AdminHome/>} />
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="orders" element={<Orders/>} />
                <Route path="tables" element={<Tables/>} />
                <Route path="categories" element={<Categories/>} />
                <Route path="payment-history" element={<PaymentHistory/>} />
                <Route path="products" element={<Products/>} />
                <Route path="users" element={<Users/>} />
            </Route>

            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
