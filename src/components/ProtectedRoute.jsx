import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute=()=> {
    const user = localStorage.getItem('id')
    return user ? <Outlet/> : <Navigate to="/Login" />
}
export default ProtectedRoute;