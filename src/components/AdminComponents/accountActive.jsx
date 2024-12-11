import './accountActive.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AccountActive_Panel() {

    const [dataOnline, setDataOnline] = useState([]);

    useEffect(() => {
        axios.get(localStorage.getItem('urlLink')+'Account_OnlineUsers.php')
          .then(response => {
            setDataOnline(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const [dataOffline, setDataOffline] = useState([]);

      useEffect(() => {
          axios.get(localStorage.getItem('urlLink')+'Account_OfflineUsers.php')
            .then(response => {
              setDataOffline(response.data);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        }, []);

    return (
        <div class="accountActive-panel">
            <div class="accountActive-header">
                <h2> ONLINE ACCOUNTS</h2>
            </div>

            <div class="accountActive-list">

                <div class="accountActive-list-content">
                    <div class="accountActive-list-header">
                        <label> NAME </label>
                        <label> BRANCH </label>
                        <label> STATUS </label>
                        <label></label>
                    </div>

                    {dataOnline.length > 0? (<div>
                {dataOnline.map((item, index) => (

                    <div class="accountActive-list-items">
                        <label> {item.username} </label>
                        <label> {item.branch} </label>
                        <label> <p style={{ color: 'white', backgroundColor: 'green', width: '4rem', padding: '.5rem'}}>ONLINE</p> </label>
                        <label> {item.activeTimeDate} </label>
                    </div>

                    ))} </div> ): (<div> </div>)}

                    <hr style={{ marginTop: '1rem', marginBottom: '1rem', width: '0px'}}/>
                    <p style={{ fontSize: '1.2rem',textAlign: 'center', color: 'gray', padding: '.5rem', borderBottom: 'solid 2px black'}}>
                        - OFFLINE USERS -
                    </p>


                    {dataOffline.length > 0? (<div>
                {dataOffline.map((item, index) => (

                    <div class="accountActive-list-items">
                        <label> {item.username} </label>
                        <label> {item.branch} </label>
                        <label> <p style={{ color: 'white', backgroundColor: 'gray', width: '4rem', padding: '.5rem'}}>OFFLINE</p> </label>
                        <label> {item.activeTimeDate} </label>
                    </div>

                    ))} </div> ): (<div> </div>)}
                </div>
            </div>
        </div>
    )
}

export default AccountActive_Panel