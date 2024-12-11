import '../assets/records.css'

import AppHeader from './App-Header'
import AppSidebar from './App-Sidebar'

import HeaderPanel from './RecordsComponents/header-records'
import RecordList from './RecordsComponents/recordList'
import RecordInformation from './RecordsComponents/recordInformation'
import Checker from './checkUpdates'

import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'


function Records_Page ({userData}) {
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
        <div class="container-records">
            <div class="sidebar">
            <AppSidebar userData={userData}/>
            </div>
            <div class="main-records">
                <div class="topBar-records">
                    <HeaderPanel />
                    <hr />
                </div>
                <div class="content-records">
                    <RecordList userData={userData}/>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Records_Page
