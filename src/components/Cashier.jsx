import '../assets/cashier.css'
import AppHeader from './App-Header'
import AppSidebar from './App-Sidebar'

import HeaderPanel from './CashierComponents/header-cashier'
import SearchBarPanel from './CashierComponents/searchBar'
import RecentItemsPanel from './CashierComponents/recentItems'

import CurrentItemListPanel from './CashierComponents/currentItemList'

import ListCount from './CashierComponents/backend/ListCategoryItemCount'
import Checker from './checkUpdates'

import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Cashier_Page({userData}){

    const navigate = useNavigate('');
    const check =()=>{
        if(userData.role == 'Admin') {
            navigate('/Admin')
        }
    }

    useEffect(() => {
        check()
      }, []);

    return(
        <div class="appMain">
                    <Checker />
        <AppHeader userData={userData}/>
        <div class="container-cashier">
        <div class="sidebar">
        <AppSidebar userData={userData}/>
            </div>
            <div class="main-cashier">
                <div class="topBar-cashier">
                    <HeaderPanel />
                    <hr />
                </div>
                <div class="productList-container">
                    <ListCount userData={userData}/>

                    <CurrentItemListPanel userData={userData}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Cashier_Page