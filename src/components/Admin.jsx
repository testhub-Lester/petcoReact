import '../assets/admin.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AppHeader from './App-Header'

import AdminDashboard_Panel from './AdminComponents/AdminDashboard'
import AdminAnalytics_Panel from './AdminComponents/AdminAnalytics'
import AdminRecords_Panel from './AdminComponents/AdminRecords'
import AdminInventory_Panel from './AdminComponents/AdminInventory'
import Checker from './checkUpdates'

function Admin_Page({userData}){
    
    const navigate = useNavigate('');
    const check =()=>{
        if(userData.role == 'Cashier') {
            navigate('/Dashboard')
        }
    }

    useEffect(() => {
        check()
      }, []);

    const [showDashboard, setShowDashboard] = useState(false)
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [showRecords, setShowRecords] = useState(false)
    const [showInventory, setShowInventory] = useState(false)

    const toggleDashboard= () => {
        setShowAnalytics(false)
        setShowRecords(false)
        setShowInventory(false)
        setShowDashboard(true)
    }

    const toggleAnalytics= () => {
        setShowDashboard(false)
        setShowRecords(false)
        setShowInventory(false)
        setShowAnalytics(true)
    }

    const toggleRecords= () => {
        setShowDashboard(false)
        setShowAnalytics(false)
        setShowInventory(false)
        setShowRecords(true)
    }

    const toggleInventory= () => {
        setShowDashboard(false)
        setShowAnalytics(false)
        setShowRecords(false)
        setShowInventory(true)
    }

    const toggleLogout= () => {
        localStorage.setItem('id', '')
        localStorage.setItem('name', '')
        localStorage.setItem('role', '')
        localStorage.setItem('branch', '')
        alert(userData.name + ' - Logout')
        window.location.reload();
    }

    const accountStatus =() => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const dayA = day < 10 ? `0${day}` : day;
        const monthA = month < 10 ? `0${month}` : month;
        const dateToday = (year + "-" + monthA + "-" + dayA);
    
        const currentTime = new Date();
        const hr = currentTime.getHours();
        const hour = hr < 10 ? `0${hr}` : hr;
        const min = currentTime.getMinutes();
        const minutes = min < 10 ? `0${min}` : min;
        const timeToday = (hour + ":" + minutes);
  
        const TimeDate = timeToday + " - " + dateToday
        
        const name = localStorage.getItem('name')
        const formData = new FormData();
        formData.append('username', name);
        formData.append('active', 'OFFLINE');
        formData.append('activeTimeDate', TimeDate);
        axios.post(localStorage.getItem('urlLink')+'Account_ActiveStatus.php', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            alert.error('There was an error logging in!', error);
          });

          toggleLogout()
      };

      const [hideDashboard, sethideDashboard] = useState(false);

      const managerOnly = () => {
        if (userData.role === 'Manager') {
            sethideDashboard(true)
            toggleAnalytics()
        }else{
            setShowDashboard(true)
        }
      }

      useEffect(() => {
        managerOnly()
      }, []);
    return(
        <div class="appMain">
                                            <Checker />
        <AppHeader userData={userData}/>
        <div class="container-admin">
        <div class="sidebar">
            </div>
            <div class="main-admin">
            <div class="topBar-admin">
                <div class="adminHeader-panel">
                    {hideDashboard ? '' :
                    <button value={showDashboard} onClick={toggleDashboard} >
                        <span class="material-symbols-sharp"> team_dashboard </span>
                        <p>DASHBOARD</p>
                    </button>}

                    <button value={showAnalytics} onClick={toggleAnalytics}>
                        <span class="material-symbols-sharp"> monitoring </span>
                        <p>ANALYSIS</p>
                    </button>

                    <button value={showRecords} onClick={toggleRecords}>
                        <span class="material-symbols-sharp">  receipt_long </span>
                        <p>RECORDS</p>
                    </button>
                    <button value={showInventory} onClick={toggleInventory}>
                        <span class="material-symbols-sharp"> inventory_2 </span>
                        <p>INVENTORY</p>
                    </button>

                    <button onClick={()=> accountStatus()} style={{ backgroundColor: 'maroon', color: 'white', border: 'solid 2px maroon'}}>
                        <span class="material-symbols-sharp"> logout </span>
                        <p> LOGOUT </p>
                    </button>
                </div>
                { showDashboard && (<AdminDashboard_Panel userData={userData}/>)}
                { showAnalytics && (<AdminAnalytics_Panel userData={userData}/>)}
                { showRecords && (<AdminRecords_Panel userData={userData}/>)}
                { showInventory && (<AdminInventory_Panel userData={userData}/>)}
            </div>
            </div>
        </div>
        </div>
    )
}

export default Admin_Page