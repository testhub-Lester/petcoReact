import './inventoryList.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function InventoryList_Analytics({userData}) {

    // Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('itemBranch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryLow.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div class="inventoryListPanel">
            <div class="inventoryListHeader">
                <h2>
                    <span class="material-symbols-sharp"> inventory_2 </span>
                    <p> INVENTORY QUANTITY STATUS </p>
                </h2>
            </div>
            <div class="inventoryListContent">
                <div class="inventoryListContent-header">
                    <label> ITEM </label>
                    <label> QUANTITY </label>
                    <label> STATUS </label>
                </div>
                <hr />
                <div class="inventoryListContent-list">
                {data.length > 0? ( <div>
                    {data.map((item, index) => (
                        <div>
                    <div class="inventoryItems">
                    <label> {item.itemName} </label>
                    <label> {item.itemQuantity} </label>
                    <label>
                        {item.itemQuantity == 0 ? <p style={{ background: 'red', color: 'white', padding: '.5rem', width: '3rem'}}>ZERO</p>: ''}
                        {item.itemQuantity > 0 ? <p style={{ background: 'orange', color: 'white', padding: '.5rem', width: '3rem'}}>LOW</p> : ''}
                    </label>
                    </div>
                    <hr />

                    </div> 

))} </div> ): (<div>  </div>)}


                </div>
            </div>
        </div>
    )
}

export default InventoryList_Analytics;