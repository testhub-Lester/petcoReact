import axios from 'axios';
import React, { useEffect, useState } from 'react';

import InformationTab from '../informationTabInventory'

function AllList_Inventory({branch, userData}){
    const [showInfo, setshowInfo] = useState(false)
    const [key, setKey] = useState(0);
    const [itemInfoID, setitemInfoID] = useState();
    const [itemInfoName, setitemInfoName] = useState();
    const [itemInfoIdentifier, setitemInfoIdentifier] = useState();


    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };
    //Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('itemBranch', branch);

        axios.post(localStorage.getItem('urlLink')+'getInventoryListAllInventoryDeleted.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const passValueToInfoTab = (id, name, identifier) => {
        setitemInfoID(id)
        setitemInfoName(name)
        setitemInfoIdentifier(identifier)
        setKey(prevKey => prevKey + 1);
        setshowInfo(true)
    }

    const [base64, setBase64] = useState('');
    
    return(
        <div>
        {data.length > 0? (
            <div class="inventory-itemList">
        {data.map((item, index) => (
            <div>
        <button onClick={()=> {passValueToInfoTab(item.itemID, item.itemName, item.identifier)}}>
        <div class="inventory-item" value={item.itemQuantity < 5 ? 'low' : ''}>
            
            <div class="item-img">
            <h4> ID{item.itemID}</h4>
                <img src={item.itemImage} />
            </div>
            <div class="inventory-item-info">
                <div class="item-info-name">
                    <h3> {item.itemName}</h3>
                    <h5> PRICE: {formatPrice(item.itemPrice)}</h5>
                </div>
                <div class="item-info-description">
                {item.itemType === 'Grooming' || item.itemType === 'Treatment' || item.itemType === 'Examination'?
                    (<p> </p>) : (<p> QUANTITY: {item.itemQuantity}</p>)}
                    <p> SOLD: {item.itemSold} </p>
                </div>
            </div>
        </div>
        </button>
        </div>
        ))}
        </div>
    ): (<div class="inventoryList-empty"> <label>EMPTY</label> </div>)}
             {showInfo && <div key={key}><InformationTab closeModal={setshowInfo} branch={branch} userData={userData} itemID={itemInfoID} itemName={itemInfoName} itemIdentifier={itemInfoIdentifier}/></div>}
             </div>
    )
}
export default AllList_Inventory