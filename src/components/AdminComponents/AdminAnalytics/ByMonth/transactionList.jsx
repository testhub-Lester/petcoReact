import './transactionList.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecordInformation from './recordInformation';

function TransactionList_Analytics({branch, date}) {
    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getRecordsToday.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [transactionIDData, settransactionIDData] = useState('')

    const [openInfo, setInfo] = useState(false)
    const toggleInformation= (transactionID) => {
        settransactionIDData(transactionID)
        setInfo(true)
    }

    return (
        <div class="admin-transactionListPanel">
            <div class="admin-transactionListHeader">
                <h2>
                    <span class="material-symbols-sharp">  receipt_long </span>
                    <p> TRANSACTION LIST </p>
                </h2>
            </div>
            <div class="admin-transactionListContent">
                <div class="admin-transactionListContent-header">
                    <label style={{width: '10rem'}}> TRANSACTION ID</label>
                    <label> AMOUNT </label>
                    <label style={{width: '7rem'}}> CASHIER </label>
                </div>
                <hr />
                <div class="admin-transactionListContent-list">

                {data.length > 0? ( <div>
                    {data.map((item, index) => (
                        <div>

                    <div class="admin-transactionItems">
                    <label style={{width: '10rem'}}> {item.transactionID} </label>
                    <label> {formatPrice(item.totalAmount)} </label>
                    <label style={{width: '7rem'}}> {item.cashier} </label>
                    </div>
                    <hr />

                    </div> 

                ))} </div> ): (<div class="bulletinBoard-empty"> </div>)}

                </div>
            </div>
            {openInfo && <RecordInformation closeModal={setInfo} branch={branch} transactionID={transactionIDData}/> }
        </div>
    )
}

export default TransactionList_Analytics;