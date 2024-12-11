import './modalNotificationAdmin.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Notification_Modal({closeModal, userData}){
    const [openBulletin, setBulletin] = useState(true)
    const [openInformation, setInformation] = useState(false)
    const [openUpdate, setUpdate] = useState(false)
    const [openQuantityLow, setQuantityLow] = useState(true)
    const [openQuantityZero, setQuantityZero] = useState(false)

    const toggleBulletin = () => {      
        setInformation(false)
        setBulletin(true)
    }

    const toggleInformation = () => {
        setBulletin(false)
        setInformation(true)
    }

    const toggleUpdates = () => {
        setQuantityLow(false)
        setQuantityZero(false)
        setUpdate(true)
    }

    const toggleQuantityLow = () => {
        setQuantityZero(false)
        setUpdate(false)
        setQuantityLow(true)
    }

    const toggleQuantityZero = () => {
        setQuantityLow(false)
        setUpdate(false)
        setQuantityZero(true)
    }

    //Backend - getNotification.php
    const [dataBulletin, setDataBulletin] = useState([]);

    
    useEffect(() => {
    const data = new FormData();
    data.append('notifType', 'BulletinBoard');
    
    axios.post(localStorage.getItem('urlLink')+'Notification_UnreadListBulletin.php', data)
    .then(response => {
    setDataBulletin(response.data);
    })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }, []);

    const [dataInformation, setDataInformation] = useState([]);

    
    useEffect(() => {
    const data = new FormData();
    data.append('notifType', 'InformationBoard');
    
    axios.post(localStorage.getItem('urlLink')+'Notification_UnreadListInformationAdmin.php', data)
    .then(response => {
    setDataInformation(response.data);
    })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }, []);

    const [key, setkey] = useState(0)

    const bulletinRead = (id) => {
        const formData = new FormData();
        formData.append('id', id);

        axios.post(localStorage.getItem('urlLink')+'Notification_ReadBulletin.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            bulletinListRepeat();
    };

const bulletinListRepeat =() => {
    setDataBulletin(0)
    setBulletin(false)
        const data = new FormData();
        data.append('notifType', 'BulletinBoard');
        
        axios.post(localStorage.getItem('urlLink')+'Notification_UnreadListBulletin.php', data)
        .then(response => {
        setDataBulletin(response.data);
        })
          .catch(error => {
              console.error('There was an error!', error);
          });
          setkey(key + 1)
          toggleBulletin()
        }
    

    return (
        <div class="NotificationAdmin-container">
            <div class="NotificationAdmin-modal">
            <div class="NotificationAdmin-header">
                <h2> Notification: ADMIN </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : ''  }



            </div>
            <div class="NotificationAdmin-content">
            
            <div class="NotificationAdmin-content-boards">
                <button value={openBulletin} onClick={toggleBulletin}> BULLETIN BOARD </button>
                <button value={openInformation} onClick={toggleInformation}> INFORMATION BOARD </button>
                <hr />

                {openBulletin &&
                <div class="NotificationAdmin-content-bulletin" key={key}>

                    {dataBulletin.length > 0? (<div>
                    {dataBulletin.map((item, index) => (
                    <button onClick={()=> bulletinRead(item.id)}>
                    <div class="NotificationAdmin-content-bulletin-header">
                    <label style={{ background: 'black', color: 'white'}}> ADMIN </label>
                    <label> {item.notifDateTime} </label>
                    </div>
                    <div class="NotificationAdmin-content-bulletin-content">
                    NOTE:
                        <label>
                            {item.notifContent}
                        </label>
                    </div>

                    </button>))} </div> ): (<div> </div>)}

                </div>}

                {openInformation &&
                <div class="NotificationAdmin-content-bulletin" key={key}>
                    {dataInformation.length > 0? (<div>
                    {dataInformation.map((item, index) => (
                    <button>
                    <div class="NotificationAdmin-content-bulletin-header">
                    <label style={{ marginLeft: '-.5rem'}}>
                        <label style={{ background: 'black', color: 'white'}}> {item.branch} </label>
                        <label style={{ background: 'black', color: 'white', marginLeft: '.5rem'}}> {item.notifAuthor} </label>
                    </label>

                    <label> {item.notifDateTime} </label>
                    </div>
                    <div class="NotificationAdmin-content-bulletin-content">
                    NOTE:
                        <label>
                            {item.notifContent}
                        </label>
                    </div>

                    </button>))} </div> ): (<div> </div>)}
                </div>}
            </div>
            </div>

            <div class="NotificationAdmin-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> close </span>
                CLOSE
                </button>
            </div>
            </div>
        </div>
    )
}

export default Notification_Modal