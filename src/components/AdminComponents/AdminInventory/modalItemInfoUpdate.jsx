import './modalItemInfoUpdate.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AccountInfo_Modal({closeModal, id}){
    // Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('updateID', id);

        axios.post(localStorage.getItem('urlLink')+'getItemUpdatesByID.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div class="accountInfo-container">
            <div class="admin-accountInfo-modal">
            <div class="accountInfo-header">
                <h2 style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <span class="material-symbols-sharp"> update </span>
                UPDATE INFORMATION: {id} </h2>

                {null ? 
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }
            </div>

            <div class="admin-updateInfo-list">

            {data.length > 0? ( <div>
                    {data.map((item, index) => (
                <div>
                    
                <div class="admin-updateInfo-list-header">
                    <label> {item.itemName} </label>
                    <label>
                    {item.action == 'ADDED' ? <p style={{color: 'green'}}>{item.action}</p> : ''}
                    {item.action == 'UPDATED' ? <p style={{color: 'blue'}}>{item.action}</p> : ''}
                    {item.action == 'DELETED' ? <p style={{color: 'red'}}>{item.action}</p> : ''}
                    {item.action == 'RESTORED' ? <p style={{color: 'indigo'}}>{item.action}</p> : ''}
                    </label>
                </div>
                <hr />

                <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem'}}>
                <div class="admin-updateInfo-list-middleLeft">
                <label> BRANCH: {item.itemBranch} </label>
                <label> ROLE: {item.role} </label>
                <label> DATE: {item.date} </label>
                </div>

                <div class="admin-updateInfo-list-middleright">
                    <textarea value={item.information == null ? '': "INFORMATION: \n \n" + item.information}/>
                </div>
                </div>
</div> 
))} </div> ): (<div>  </div>)}
            </div>


            <div class="itemUpdateInfo-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> arrow_back </span>
                BACK
            </button>
            </div>

            </div>
        </div>
    )
}

export default AccountInfo_Modal