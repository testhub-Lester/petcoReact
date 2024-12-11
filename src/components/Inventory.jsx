import '../assets/inventory.css'
import AppHeader from './App-Header'
import AppSidebar from './App-Sidebar'

import HeaderPanel from './InventoryComponents/header-inventory'
import SearchBarPanel from './InventoryComponents/searchBar'
import ItemListPanel from './InventoryComponents/inventoryItemList'
import InformationTab from './InventoryComponents/informationTabInventory'
import Checker from './checkUpdates'

import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Inventory_Page({userData}){
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
        <div class="container-inventory">
        <div class="sidebar">
        <AppSidebar userData={userData}/>
            </div>
            <div class="main-inventory">
                <div class="topBar-inventory">
                    <HeaderPanel />
                </div>
                <hr />
                <ItemListPanel userData={userData}/>
            </div>
        </div>
        </div>
    )
}

export default Inventory_Page