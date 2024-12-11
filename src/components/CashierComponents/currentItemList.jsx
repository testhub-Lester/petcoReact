import './currentItemList.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

function CurrentItemList_Panel({userData}) {
    const [openPaymentModal, setPaymentModal] = useState(false)

    const [openModal, setModal] = useState(false);

    //Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('branch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getCurrentItemCashier.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }, []);

    const removeItem = (itemID) => {
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'deleteCurrentItemCashier.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
        closeAddModal(false)
    };

    return (
        <div class="currentItemList-Panel">
            <div class="currentItemList-header">
                <h2> CURRENT ITEMS</h2>
            </div>

            {data.length > 0? (<div>
            <div class="currentItemList-table">
                <table>
                    <thead>
                        <th> NAME </th>
                        <th> PRICE </th>
                        <th></th>
                    </thead>

                    {data.map((item, index) => (
                    <tbody>
                        <td>{item.currentItemName}</td>
                        <td>₱{item.defaultPrice}</td>
                        <td>
                            <button onClick={()=> {removeItem(item.itemID)}}>
                            <span class="material-symbols-sharp"> delete</span>
                            </button>
                        </td>
                    </tbody>
                    ))}                    
                </table>
            </div>

            <div class="currentItemList-footer">
            <Link to="/Cashier/PaymentTab" className='links'>
                <button class="buttonProceed"> PROCEED TO PAYMENT </button>
            </Link>
            </div>

            </div> ): (<div class="currentItemList-empty"> EMPTY </div>)}
        </div>
        
    )
}

export default CurrentItemList_Panel;