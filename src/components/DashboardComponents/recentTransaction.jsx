import './recentTransaction.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TransactionInfo_Dashboard({userData}){
    const navigate = useNavigate();

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

        axios.post(localStorage.getItem('urlLink')+'getRecordsRecent.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <div class="transactionPanel">
            <h2> RECENT TRANSACTION</h2>
            <div class="transaction-list">
                <div class="transactionList-header">
                    <label>TRANSACTION ID</label>
                    <label>AMOUNT</label>
                    <label>TIME - DATE</label>
                    <label></label>
                </div>
                {data.length > 0? (
                    <div>
                        {data.map((item, index) => (
                <div class="transactionList-content">
                    <label> TR{item.transactionID} </label> 
                    <label> ₱ {item.totalAmount} </label>
                    <label> {item.time} - {item.date}</label>
                    <label><button onClick={()=> navigate('/Records')}> TO RECORDED LIST </button></label>
                </div>
                ))}
                </div>
                ): (<div class="bulletinBoard-empty"></div>)}
            </div>
        </div>
    )
}

export default TransactionInfo_Dashboard;