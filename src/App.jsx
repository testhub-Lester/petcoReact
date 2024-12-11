import './App.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom"

import Login from "./components/Login"
import Dashboard_Page from './components/Dashboard';
import Cashier_Page from './components/Cashier';
import Records_Page from './components/Records';
import Inventory_Page from './components/Inventory';
import Analytics_Page from './components/Analytics';
import Admin_Page from './components/Admin';

import PaymentTab from './components/CashierComponents/modalPayment';
import NotFound from "./components/NotFound"

import ProtectedRoute from './components/ProtectedRoute';

function Logout() {
  return <Navigate to="/Login" />;
}

function LoginAccountCashier() {
  return <Navigate to="/Dashboard" />
}

function LoginAccountAdmin() {
  return <Navigate to="/Dashboard" />
}

function App() {

  const [userData, setUserData] = ([
    { id:localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      branch: localStorage.getItem('branch')}]);
      
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route index element={<Login/>} />
      
        <Route element={<ProtectedRoute/>}>
        <Route path='/Dashboard' element={<Dashboard_Page userData={userData}/>} />
        <Route path='/Cashier' element={<Cashier_Page userData={userData}/>} />
        <Route path='/Records' element={<Records_Page userData={userData}/>} />
        <Route path='/Inventory' element={<Inventory_Page userData={userData}/>} />
        <Route path='/Analytics' element={<Analytics_Page userData={userData}/>} />
        <Route path='/Admin' element={<Admin_Page userData={userData}/>} />
        <Route path='/Cashier/PaymentTab' element={<PaymentTab userData={userData}/>} />
        </Route>

        <Route path="/Login" element={<Login/>} />
        <Route path="/Logout" element={Logout()} />
        <Route path="/LoginAccountCashier" element={LoginAccountCashier()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
