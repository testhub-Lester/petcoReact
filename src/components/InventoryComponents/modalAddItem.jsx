import './modalAddItem.css'
import axios from 'axios';
import React, { useState } from 'react';

const ModalAddItem_Inventory=({closeAddModal, userData})=> {
    const [hideQuantity, setHideQuantity] = useState(true)
    const [hideAddValue, setAddValue] = useState(true)

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
        const selectElement = document.getElementById('itemSelect');
        const selectedValue = selectElement.value;
        setitemType(selectedValue)
        if (selectedValue == 'Treatment' || selectedValue == 'Grooming' || selectedValue == 'Examination'){
            setHideQuantity(false)
            setitemQuantity(10000)
        }else {
            setitemQuantity('')
            setHideQuantity(true)
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setitemImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    
    // Backend
    const [itemImage, setitemImage] = useState('');
    const [itemName, setitemName] = useState('');
    const [itemType, setitemType] = useState('');
    const itemBranch = userData.branch
    const [itemPrice, setitemPrice] = useState();
    const [itemQuantity, setitemQuantity] = useState();
    const itemSold = 0
    const date = dateToday

      const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('identifier', num1+""+num2+""+num3+""+num4);
          formData.append('itemName', itemName);
          formData.append('itemType', itemType);
          formData.append('itemBranch', itemBranch);
          formData.append('itemPrice', itemPrice);
          formData.append('itemQuantity', itemQuantity);
          formData.append('itemSold', itemSold);
          formData.append('itemImage', itemImage);
          formData.append('date', date);
  
          axios.post(localStorage.getItem('urlLink')+'addInventory.php', formData)
              .then(response => {
                  console.log(response.data);
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
            itemUpdate()
          alert('ITEM - ADDED')
          window.location.reload()
          closeAddModal(false)
      };

      const itemUpdate = () => {
        const uID = 'UID' + dayA + monthA + "-" + num1 + num2 + num3 + num4
        const info =
        "Item Type: " + itemType + " \n" +
        "Item Name: " + itemName + "\n" +
        "Image: Added " + "\n" +
        "Price: " + itemPrice + "\n" +
        "Quantity: " + itemQuantity + "\n"
        const formData = new FormData();
        formData.append('updateID', uID);
        formData.append('identifier', num1+""+num2+""+num3+""+num4);
        formData.append('itemID', '');
        formData.append('itemName', itemName);
        formData.append('itemBranch', itemBranch);
        formData.append('role', userData.name);
        formData.append('action', 'ADDED');
        formData.append('information', info);
        formData.append('date', dateToday);

        axios.post(localStorage.getItem('urlLink')+'Inventory_updateAdd.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    

    return (
        <div class="addItem-container">
            <div class="addItem-panel">
            <div class="addItem-header">
                <h1>
                    <span class="material-symbols-sharp"> check_box </span>
                    <p>ADD - ITEM</p>
                </h1>

                {null ?
                <button onClick={() => {closeAddModal(false);}}>
                    <span class="material-symbols-sharp"> add </span>
                </button> : '' }


            </div>

            <form onSubmit={handleSubmit}>
            <div class="addItem-content">


            <div class="addItem-topbarOption">
                <div class="selectionCategory">
                <div class="addItem-content-info">
                   <label> BRANCH: {userData.branch} </label>
                   <label> ID: {userData.name} </label>
                </div>
                    <div class="selections">
                        <label> Select Type of Item:</label>
                        <select id="itemSelect" onChange={getItemType} required>
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
                    <div class="itemAdd-name">
                    <label> Item Name: </label>
                    <input type='text' value={itemName} placeholder='Enter item name here' onChange={(e) => setitemName(e.target.value)}  required/>
                </div>
                </div>

                <div class="imageInsert">
                    <img src={itemImage} name="image" alt="No Image" />
                    <input type='file' onChange={handleImageChange} accept="image/*" required/>
                </div>

            </div>




                <div class="itemAdd-price">
                    <label> PRICE: </label>
                    <label> ₱ <input type="number" value={itemPrice} onChange={(e) => setitemPrice(e.target.value)} required/></label>
                </div>
                {hideQuantity && (
                <div class="itemAdd-quantity">
                    <label> QUANTITY: </label>
                    <input type="number" value={itemQuantity} onChange={(e) => setitemQuantity(e.target.value)} required/>
                </div>)
                }
                
            </div>
            <div class="addItem-footer">
                <button class="cancel" onClick={() => {closeAddModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button type="submit" class="save">
                <span class="material-symbols-sharp"> add_box </span>
                ADD
                </button>
            </div>
            </form>
            </div>
        </div>
    )
}

export default ModalAddItem_Inventory;