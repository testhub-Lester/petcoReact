import './transactionList.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TransactionList_Analytics({userData}) {
    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const dayA = day < 10 ? `0${day}` : day;
      const monthA = month < 10 ? `0${month}` : month;
      const dateToday = (year + "-" + monthA + "-" + dayA);
      
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('branch', userData.branch);
        data.append('date', dateToday);

        axios.post(localStorage.getItem('urlLink')+'getRecordsToday.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div class="transactionListPanel">
            <div class="transactionListHeader">
                <h2>
                    <span class="material-symbols-sharp">  receipt_long </span>
                    <p> TRANSACTION LIST </p>
                </h2>
            </div>
            <div class="transactionListContent">
                <div class="transactionListContent-header">
                    <label> TRANSACTION </label>
                    <label> AMOUNT </label>
                    <label> CASHIER </label>
                </div>
                <hr />
                <div class="transactionListContent-list">

                {data.length > 0? ( <div>
                    {data.map((item, index) => (
                        <div>

                    <div class="transactionItems">
                    <label> {item.transactionID}</label>
                    <label> {formatPrice(item.totalAmount)} {item.discount > 0 ? (<p>DISCOUNT: {item.discount}</p>) : ''}</label>
                    <label> {item.cashier} </label>
                    </div>
                    <hr />

                    </div> 

                ))} </div> ): (<div class="bulletinBoard-empty"> </div>)}

                </div>
            </div>
        </div>
    )
}

export default TransactionList_Analytics;