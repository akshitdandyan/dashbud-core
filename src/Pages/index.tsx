import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Dashboard from "./Dashboard/Dashboard";
import Protected from "./Hoc/Protected";
import Register from "./Register/Register";

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/new" element={<Register />} />
        <Route
          path="/dashboard/*"
          element={
            // <Protected>
            //     <Dashboard />
            // </Protected>
            <Dashboard />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
