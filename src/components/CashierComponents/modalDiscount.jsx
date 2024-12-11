import './modalDiscount.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ModalDiscount_Dashboard({closeModal, userData, itemID, itemName}) {
    const [discountValue, setdiscountValue] = useState(0)

    const discount = () => {
        const selectElement = document.getElementById('discountInput');
        const selectedValue = selectElement.value;
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);
        formData.append('currentItemDiscount', selectedValue);

        axios.post(localStorage.getItem('urlLink')+'discount.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
    }

    const discountRemove = () => {
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'discountRemove.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
    }
    return (
        <div class="modalDiscount-container">
            <div class="modalDiscount-panel">
            <div class="modalDiscount-header">
                <h1>
                    <i class='bx bxs-discount'></i>
                    DISCOUNT
                </h1>
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button>
            </div>
            <div class="modalDiscount-content">
                <label> AMOUNT: </label>
                <input id='discountInput' type='number' placeholder='0000.00'/>
                <button class="save" onClick={discountRemove}>
                REMOVE DISCOUNT
                </button>
            </div>
            <div class="modalDiscount-footer">
                <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button class="save" onClick={discount}>
                <span class="material-symbols-sharp"> add </span>
                APPLY
                </button>
            </div>
            </div>
        </div>
    )
}

export default ModalDiscount_Dashboard;