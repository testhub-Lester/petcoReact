import '../assets/dashboard.css'
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar from 'react-calendar';

import AppHeader from './App-Header'
import AppSidebar from './App-Sidebar'

import BulletinPanel from './DashboardComponents/bulletinBoard'
import InformationPanel from './DashboardComponents/informationBoard'
import RecentTransaction from './DashboardComponents/recentTransaction'
import HeaderPanel from './DashboardComponents/header-dashboard'
import CalendarPanel from './DashboardComponents/calendar'
import TimePanel from './DashboardComponents/time'
import SocialMediaPanel from './DashboardComponents/socialMedia'

import Checker from './checkUpdates'

function Dashboard_Page({userData}){
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
        <div class="container-dashboard">
            <div class="sidebar">
                <AppSidebar userData={userData}/>
            </div>
            <div class="main-dashboard">
                <div class="topBar-dashboard">
                    <BulletinPanel />
                    <InformationPanel userData={userData}/>
                </div>
                    <RecentTransaction userData={userData}/>
            </div>
            <div class="side">
                <HeaderPanel />
                <CalendarPanel />
                <Calendar />
                <TimePanel />
            </div>
        </div>
        </div>
    )
}

export default Dashboard_Page