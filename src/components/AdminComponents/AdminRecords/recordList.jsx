import './recordList.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import TransactionInfo from './recordInformation'

function RecordsList_Records({userData, branch, date}){

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
    const [key, setKey] = useState(0);
    const [transactionIDData, settransactionIDData] = useState('')

    const [openInfo, setInfo] = useState(false)
    const toggleInformation= (transactionID) => {
        settransactionIDData(transactionID)
        setInfo(true)
    }

    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);
        data.append('date', date);

        axios.post(localStorage.getItem('urlLink')+'getRecordsToday.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <div class="admin-recordContainer">
    <div class="admin-record-list">
        <div class="admin-recordList-header">
        <label> TRANSACTION ID </label> 
        <label> CASHIER </label>
        <label> TOTAL AMOUNT </label>
        <label> TIME/DATE </label>
        <label> DETAILS </label>
        </div>
{data.length > 0? (
    <div class="admin-recordsList-content">
    {data.map((item, index) => (
    <div class="admin-recordsList-content-items">
        <label> {item.transactionID} </label> 
        <label> {item.cashier} </label>
        <label> {formatPrice(item.totalAmount)} </label>
        <label> {item.time} - {item.date}</label>
        <label><button onClick={()=> {toggleInformation(item.transactionID)}}> SHOW INFOMATIONS </button></label>
    </div>
))}
</div>
): (<div> </div>)}
    </div>

    {openInfo && <TransactionInfo closeModal={setInfo} userData={userData} branch={branch} transactionID={transactionIDData}/> }
    </div>
    )
}

export default RecordsList_Records;