import './quantityStatus.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QuantityStatus({branch}) {

    // Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('itemBranch', branch);

        axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryLow.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div class="admin-inventoryListPanel">
            <div class="admin-inventoryListHeader">
                <h2>
                    <span class="material-symbols-sharp"> detector_status </span>
                    <p> QUANTITY STATUS </p>
                </h2>
            </div>
            <div class="admin-inventoryListContent">
                <div class="admin-inventoryListContent-header">
                    <label> ITEM </label>
                    <label> QUANTITY </label>
                    <label> STATUS </label>
                </div>
                <hr />
                <div class="admin-inventoryListContent-list">
                {data.length > 0? ( <div>
                    {data.map((item, index) => (
                        <div>
                    <div class="admin-inventoryItems">
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

export default QuantityStatus;