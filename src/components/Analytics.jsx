import '../assets/analytics.css'
import AppHeader from './App-Header'
import AppSidebar from './App-Sidebar'

import ReportAnalysisPanel from './AnalyticsComponents/reportAnalysis'
import ReportGraphPanel from './AnalyticsComponents/reportGraph'
import TransactionListPanel from './AnalyticsComponents/transactionList'
import InventoryListPanel from './AnalyticsComponents/inventoryList'
import SideBubblePanel from './AnalyticsComponents/sideBubble'
import Checker from './checkUpdates'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Analytics_Page({userData}){
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
        <div class="container-analytics">
        <div class="sidebar">
        <AppSidebar userData={userData}/>
            </div>
            <div class="main-analytics">
                <div class="topSide-analytics">
                    <ReportAnalysisPanel userData={userData}/>
                </div>
                <div class="bottomSide-analytics">
                <ReportGraphPanel userData={userData}/>
                    <TransactionListPanel userData={userData}/>
                    <InventoryListPanel userData={userData}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Analytics_Page