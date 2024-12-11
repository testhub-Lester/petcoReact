import './modalDeleteItem.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ModalDeleteItem_Inventory({closeDelModal, userData}) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year + "-" + monthA + "-" + dayA);

    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const num3 = Math.floor(Math.random() * 9) + 1;
    const num4 = Math.floor(Math.random() * 9) + 1;

    const getItemType = () => {
        const selectElement = document.getElementById('itemSelectCategory');
        const selectedValue = selectElement.value;
        getItemList(selectedValue)
    }

    // Backend
    const [dataA, setData] = useState([]);

    const getItemList = (itemType) => {
        const formData = new FormData();
        formData.append('itemType', itemType);
        formData.append('itemBranch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'getInventoryListByTypeDelete.php', formData)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
        });
        };

    const deleteSelectedItem = (id, identifier, name) => {
        itemUpdate(identifier, name)
        removeItem(id)
        const data = new FormData();
        data.append('itemID', id);
        data.append('branch', userData.branch);
        axios.post(localStorage.getItem('urlLink')+'deleteItemInventory.php', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        alert('ITEM - DELETED')
        window.location.reload()
        closeDelModal(false)
      };
      
      const itemUpdate = (identifier, name) => {
        const uID = 'UID' + dayA + monthA + "-" + num1 + num2 + num3 + num4
        const formData = new FormData();
        formData.append('updateID', uID);
        formData.append('identifier', identifier);
        formData.append('itemName', name);
        formData.append('itemBranch', userData.branch);
        formData.append('role', userData.name);
        formData.append('action', 'DELETED');
        formData.append('information', '\n BY: ' + userData.name );
        formData.append('date', dateToday);

        axios.post(localStorage.getItem('urlLink')+'Inventory_updateAdd.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const removeItem = (id) => {
        const formData = new FormData();
        formData.append('branch', userData.branch);
        formData.append('itemID', id);

        axios.post(localStorage.getItem('urlLink')+'deleteCurrentItemCashier.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    return (
        <div class="DeleteItem-container">
            <div class="DeleteItem-panel">
            <div class="DeleteItem-header">

                <h1>
                    <span class="material-symbols-sharp"> delete </span>
                    <p>DELETE - ITEM</p>
                </h1>
                {null ?
                <button onClick={() => {closeDelModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }
            </div>
            <div class="DeleteItem-content">
                <div class="DeleteItem-content-info">
                   <label> BRANCH: {userData.branch} </label>
                   <label> ID: {userData.role}{userData.id}  </label>
                </div>
                <div class="DeleteCategoryA">

                    <div class="DeletesA">
                    <label> Select Category: </label>
                    <select id="itemSelectCategory" onChange={getItemType} required>
                        <option> </option>
                        <option value="Food"> Food </option>
                        <option value="Supplies"> Supplies</option>
                        <option value="Tools"> Tools</option>
                        <option value="Grooming"> Grooming</option>
                        <option value="Medicine"> Medicine</option>
                        <option value="Treatment"> Treatment</option>
                        <option value="Examination"> Examination</option>
                        <option value="Others"> Others</option>
                    </select>
                    </div>

                    
                    <div class="DeletesA">
                     <div class="DeletesA-list">
                     <label> Select Item: </label>

                     <div class="DeletesA-list-header">
                        <label style={{width: '5rem'}}> ID </label>
                        <label style={{width: '15rem'}}> NAME </label>
                        <label> PRICE </label>
                        <label style={{width: '5rem'}}> QUANTITY </label>
                        <label style={{width: '10rem'}}> </label>
                     </div>

                     <div class="DeletesA-list-items">
                     {dataA.length > 0? ( <div>
                        {dataA.map((item, index) => (

                     <div class="DeletesA-list-item">
                        <label style={{width: '5rem'}}> ID{item.itemID} </label>
                        <label style={{width: '15rem'}}> {item.itemName} </label>
                        <label> {item.itemPrice}</label>
                        <label style={{width: '5rem', textAlign: 'center'}}> {item.itemQuantity} </label>
                        <label style={{width: '10rem', marginLeft: '2rem', marginRight: '-2rem'}}>
                            <button onClick={()=> {deleteSelectedItem(item.itemID, item.identifier,item.itemName)}}> DELETE </button>
                        </label>
                     </div>

                    ))} </div> ): (<div> </div>)}
                    
                     </div>
                     </div>

                    </div>
                </div>
            </div>
            <div class="DeleteItem-footer">
                <button class="cancel" onClick={() => {closeDelModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CLOSE
                </button>
            </div>
            </div>
        </div>
    )
}

export default ModalDeleteItem_Inventory;