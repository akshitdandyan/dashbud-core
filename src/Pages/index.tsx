import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Protected from "./Hoc/Protected";
import Register from "./Register/Register";

const Pages: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/new" element={<Register />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Pages;
