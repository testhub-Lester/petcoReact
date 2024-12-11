import '../assets/header.css';
import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import React, { useState } from 'react'
import { Offline, Online } from 'react-detect-offline'

import NotificationModal from './HeaderComponent/modalNotification'
import NotificationAdminModal from './HeaderComponent/modalNotificationAdmin'
import ConnectionModal from './HeaderComponent/modalConnection'

import CheckPrinter from './HeaderComponent/checkPrinter';

function Header_Page({userData}){

    const [openConnectionModal, setConnectionModal] = useState(false)
    const [openNotificationModal, setNotificationModal] = useState(false)
    const [openNotificationAdminModal, setNotificationAdminModal] = useState(false)

    const userID = userData.id
    const profileName = userData.name
    const branch = userData.branch
    const role = userData.role

    return(
        <div class="container-header">
            <div class="nav">


                <div class="logo">
                    <img src = {logo} alt="Logo"/>
                    {profileName ? (
                    <div class="appName">
                        <h1> PETCO. </h1>
                        <p> ANIMAL CLINIC </p>
                    </div>
                    ) : <h2> LOG-IN </h2>}
                </div>


                <div class="nav-side">

                {profileName ? (
                <div class="userPanel">
                    <div class="userInfo">
                        <h4> WELCOME!  <p> { profileName } </p></h4>
                        <h6> - {role} - {branch} -</h6>
                    </div>
                    <div class="userProfile">
                        <img src={profile}></img>
                    </div>
                </div>
                ) : null}
                
                {profileName ? (
                <div class="connection">
                    {localStorage.getItem('role') == 'Admin' ?
                        <button onClick={()=> setNotificationAdminModal(true)}>
                            <span class="material-symbols-sharp"> notifications </span>
                        </button>
                        :
                        <button onClick={()=> setNotificationModal(true)}>
                            <span class="material-symbols-sharp"> notifications </span>
                        </button>
                        }
                </div>
                ) : null}


                </div>
            </div>
            { openNotificationModal && <NotificationModal closeModal={setNotificationModal} userData={userData}/>}
            { openNotificationAdminModal && <NotificationAdminModal closeModal={setNotificationAdminModal} userData={userData}/>}
            { openConnectionModal && <ConnectionModal closeModal={setConnectionModal}/>}
        </div>
    )
}

export default Header_Page;