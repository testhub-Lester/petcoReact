import './itemUpdates.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemUpdateInfo from './modalItemInfoUpdate'

function ItemUpdates({branch}) {

    // Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'getItemUpdatesAll.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [updateID, setupdateID] = useState()

    const [openInfo, setInfo]  = useState(false)

    const itemInformationTab = (id) => {
        setupdateID(id)
        setInfo(true)
    }
    
    return (
        <div class="adminA-inventoryListPanel">
            <div class="adminA-inventoryListHeader">
                <h2>
                    <span class="material-symbols-sharp"> update </span>
                    <p> ITEM UPDATES </p>
                </h2>
            </div>
            <div class="adminA-inventoryListContent">
                <div class="adminA-inventoryListContent-header">
                    <label> ITEM NAME </label>
                    <label> ACTION </label>
                    <label> - </label>
                </div>
                <hr />
                <div class="adminA-inventoryListContent-list">
                {data.length > 0? ( <div>
                    {data.map((item, index) => (
                        <div>
                    <div class="adminA-inventoryItems">
                    <label> {item.itemName} </label>
                    <label>
                    {item.action == 'ADDED' ? <p style={{color: 'green'}}>{item.action}</p> : ''}
                    {item.action == 'UPDATED' ? <p style={{color: 'blue'}}>{item.action}</p> : ''}
                    {item.action == 'DELETED' ? <p style={{color: 'red'}}>{item.action}</p> : ''}
                    {item.action == 'RESTORED' ? <p style={{color: 'indigo'}}>{item.action}</p> : ''}
                    </label>
                    <label> <button onClick={()=> itemInformationTab(item.updateID)}> MORE </button></label>
                    </div>
                    <hr />

                    </div> 
                ))} </div> ): (<div>  </div>)}


                </div>
            </div>
            {openInfo && <ItemUpdateInfo closeModal={setInfo} id={updateID}/>}
        </div>
    )
}

export default ItemUpdates;