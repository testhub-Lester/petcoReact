import './modalNotification.css'
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
    data.append('branch', userData.branch);
    
    axios.post(localStorage.getItem('urlLink')+'Notification_UnreadListInformation.php', data)
    .then(response => {
    setDataInformation(response.data);
    })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }, []);
    
    const [dataUpdate, setDataUpdate] = useState([]);
    
    useEffect(() => {
    const data = new FormData();
    data.append('branch', userData.branch);
    
    axios.post(localStorage.getItem('urlLink')+'getItemUpdatesAll.php', data)
    .then(response => {
    setDataUpdate(response.data);
    })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }, []);
    
    const [dataQuan, setDataQuan] = useState([]);
    
    useEffect(() => {
    const data = new FormData();
    data.append('itemBranch', userData.branch);

    axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryLow.php', data)
        .then(response => {
            setDataQuan(response.data);
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
        <div class="Notification-container">
            <div class="Notification-modal">
            <div class="Notification-header">
                <h2> NOTIFICATION: {userData.branch} </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : ''  }



            </div>
            <div class="Notification-content">
            
            <div class="Notification-content-boards">
                <button value={openBulletin} onClick={toggleBulletin}> BULLETIN BOARD </button>
                <button value={openInformation} onClick={toggleInformation}> INFORMATION BOARD </button>
                <hr />

                {openBulletin &&
                <div class="Notification-content-bulletin" key={key}>

                    {dataBulletin.length > 0? (<div>
                    {dataBulletin.map((item, index) => (
                    <button onClick={()=> bulletinRead(item.id)}>
                    <div class="Notification-content-bulletin-header">
                    <label style={{ background: 'black', color: 'white'}}> ADMIN </label>
                    <label> {item.notifDateTime} </label>
                    </div>
                    <div class="Notification-content-bulletin-content">
                    NOTE:
                        <label>
                            {item.notifContent}
                        </label>
                    </div>

                    </button>))} </div> ): (<div> </div>)}

                </div>}

                {openInformation &&
                <div class="Notification-content-bulletin" key={key}>
                    {dataInformation.length > 0? (<div>
                    {dataInformation.map((item, index) => (
                    <button>
                    <div class="Notification-content-bulletin-header">
                    <label style={{ marginLeft: '-.5rem'}}>
                        <label style={{ background: 'black', color: 'white'}}> {item.branch} </label>
                        <label style={{ background: 'black', color: 'white', marginLeft: '.5rem'}}> {item.notifAuthor} </label>
                    </label>

                    <label> {item.notifDateTime} </label>
                    </div>
                    <div class="Notification-content-bulletin-content">
                    NOTE:
                        <label>
                            {item.notifContent}
                        </label>
                    </div>

                    </button>))} </div> ): (<div> </div>)}
                </div>}
            </div>
            <div class="Notification-content-inventory">
                <label> INVENTORY </label>
                
                <button value={openQuantityLow} onClick={toggleQuantityLow}> {dataQuan.length > 0 ? <p>QUANTITY: LOW [{dataQuan.length}]</p> : 'QUANTITY: LOW' }</button>
                <button value={openUpdate} onClick={toggleUpdates}> ITEM UPDATES </button>
                <hr />

                {openUpdate &&
                <div class="Notification-content-updates">
                    <div class="Notification-content-updates-header">
                        <label>ITEM NAME</label>
                        <label>ROLE</label>
                        <label>ACTION</label>
                        <label>DATE</label>
                    </div>
                    <div class="a" style={{overflowY: 'scroll', height: '19rem'}}>

                    {dataUpdate.length > 0? (<div>
                    {dataUpdate.map((item, index) => (
 
                    <div class="Notification-content-updates-list"  title={"INFORMATION \n" + item.information} >
                        <label>{item.itemName}</label>
                        <label>{item.role}</label>
                        <label>
                        {item.action == 'ADDED' ? <p style={{color: 'green'}}>{item.action}</p> : ''}
                        {item.action == 'UPDATED' ? <p style={{color: 'blue'}}>{item.action}</p> : ''}
                        {item.action == 'DELETED' ? <p style={{color: 'red'}}>{item.action}</p> : ''}
                        {item.action == 'RESTORED' ? <p style={{color: 'indigo'}}>{item.action}</p> : ''}
                        </label>
                        <label>{item.date}</label>
                        </div>
                    
                    ))} </div> ): (<div>  </div>)}
                    
                    </div>

                </div>}

                {openQuantityLow &&
                <div class="Notification-content-quantityLow">
                    <div class="Notification-content-quantityLow-header">
                        <label style={{width: '13rem'}}>ITEM NAME</label>
                        <label>QUANTITY</label>
                        <label>STATUS</label>
                    </div>
                    <div class="a" style={{overflowY: 'scroll', height: '19rem'}}>

                    {dataQuan.length > 0? (<div>
                    {dataQuan.map((item, index) => (
 
                    <div class="Notification-content-quantityLow-list">
                        <label style={{fontSize: '.8rem', width: '14rem', marginLeft: '-2rem'}}>{item.itemName}</label>
                        <label style={{fontSize: '.8rem', marginLeft: '4.5rem'}}>{item.itemQuantity}</label>
                        <label >
                        {item.itemQuantity == 0 ?
                        <p style={{ color: 'white', backgroundColor: 'red', padding: '.5rem' , textAlign: 'center', fontSize: '.8rem', marginLeft: '1rem', marginRight: '-1rem'}}> ZERO </p> : ''}
                        
                        {item.itemQuantity > 0 ?
                        <p style={{ color: 'white', backgroundColor: 'orange', padding: '.5rem' , textAlign: 'center', fontSize: '.8rem', marginLeft: '1rem', marginRight: '-1rem'}}> LOW </p> : ''}
                        </label>
                    </div>
                    
                    ))} </div> ): (<div>  </div>)}
                    
                    </div>
                </div>}

                {openQuantityZero &&
                <div class="Notification-content-quantityZero">
                    <p> QuantityZero</p>
                </div>}

            </div>
            </div>

            <div class="Notification-footer">
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