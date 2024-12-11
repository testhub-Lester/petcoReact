import './modalEditItem.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ModalEditItem_Inventory({closeModal, userData, identifier, itemID, itemImage, itemName, itemType, itemPrice, itemQuantity}) {
    const [show, setShow] = useState(true);

    const ID = itemID
    const Name = itemName
    const Image = itemImage
    const Type = itemType
    const Price = itemPrice
    const Quantity = itemQuantity

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

    const [itemIDA, setitemID] = useState(itemID);
    const [itemImageA, setitemImage] = useState(itemImage);
    const [itemNameA, setitemName] = useState(itemName);
    const [itemTypeA, setitemType] = useState(itemType);
    const [itemPriceA, setitemPrice] = useState(itemPrice);
    const [itemQuantityA, setitemQuantity] = useState(itemQuantity);

    const check = () => {
        if (itemNameA == Name && itemImageA == Image && itemTypeA == Type && itemPriceA == Price && itemQuantityA == Quantity){
            alert('No Edit')
        } else {
            itemUpdate();
            setSeconds(0)
            saveEditItem()
        }
    }
    const [infoImage, setinfoImage] = useState("");
    const [infoName, setinfoName] = useState("");
    const [infoType, setinfoType] = useState("");
    const [infoPrice, setinfoPrice] = useState("");
    const [infoQuantity, setinfoQuantity] = useState("");
    const [infoAll, setinfoAll] = useState("");

    const informationChange =()=>{
        if (itemNameA !== Name){
            setinfoName("Name: " + Name + " - " +itemNameA + "\n")
        }else{}

        if (itemImageA !== Image){
            setinfoImage("Image: "+"CHANGED"+ "\n")
        }else{}

        if (itemTypeA !== Type){
            setinfoType("Type: " + Type + " - " +itemTypeA+ "\n")
        }else{}

        if (itemPriceA !== Price){
            setinfoPrice("Price: "+ Price + " - "+ itemPriceA+ "\n")
        }else{}

        if (itemQuantityA !== Quantity){
            setinfoQuantity("Quantity: " + Quantity + " - " +itemQuantityA+ "\n")
        }else{}

        setinfoAll(infoName + infoType + infoImage + infoPrice + infoQuantity)

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

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const saveEditItem = () => {
        const data = new FormData();
        data.append('itemID', itemIDA);
        data.append('itemImage', itemImageA);
        data.append('itemName', itemNameA);
        data.append('itemType', itemTypeA);
        data.append('itemPrice', itemPriceA);
        data.append('itemQuantity', itemQuantityA);

        axios.post(localStorage.getItem('urlLink')+'updateInventoryItem.php', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        alert('ITEM - EDITED')
        window.location.reload()
        closeModal(false)
    }

    const itemUpdate = () => {
        const uID = 'UID' + dayA + monthA + "-" + num1 + num2 + num3 + num4
        const formData = new FormData();
        formData.append('updateID', uID);
        formData.append('identifier', identifier);
        formData.append('itemID', itemID);
        formData.append('itemName', itemName);
        formData.append('itemBranch', userData.branch);
        formData.append('role', userData.name);
        formData.append('action', 'UPDATED');
        formData.append('information', infoAll);
        formData.append('date', dateToday);

        axios.post(localStorage.getItem('urlLink')+'Inventory_updateAdd.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds + 1), 100);
          return () => {
            clearTimeout(timer);
            informationChange()
          };
        }
    }, [seconds]);

    return (
        <div class="editItem-container">
            <div class="editItem-panel">
            <div class="editItem-header">
                <h1> EDIT - {itemName} </h1>

                {null ? 
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }
            </div>

            <form onSubmit={handleSubmit}>
            <div class="editItem-content">
            <label> BRACH: {userData.branch} - ID: {userData.role}{userData.id}</label>
 
                <div class="itemEditName">
                <label> Item Name: [ID{itemIDA}] </label>
                <input type='text' value={itemNameA} onChange={(e) => setitemName(e.target.value)} required/>
                </div>

                <div class="itemEditInfo">
                    <div class="itemEditInfo-left">
                    <label> Category: </label>
                        <select id="itemSelect" value={itemTypeA} onChange={(e) => {setitemType(e.target.value)}} required>
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
                        
                        <p> Item Image: </p>
                        <div class="itemEditInfo-left-image">
                        <img src={itemImageA} name="image" alt="No Image" />
                        <input type='file' onChange={handleImageChange} accept="image/*" />
                        </div>
                    </div>

                    <div class="itemEditInfo-right">
                    <label> Price:</label>
                    <input type='number' value={itemPriceA} onChange={(e) => setitemPrice(e.target.value)} required/>
                    <label> Quantity: </label>
                    <input type='number' value={itemQuantityA} onChange={(e) => setitemQuantity(e.target.value)} required/>
                    </div>

                </div>
                
            </div>

            <div class="editItem-footer">
                <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button type="submit" class="save" onClick={check}>
                <span class="material-symbols-sharp"> edit </span>
                EDIT
                </button>
            </div>
            </form>

            </div>
        </div>
    )
}

export default ModalEditItem_Inventory;