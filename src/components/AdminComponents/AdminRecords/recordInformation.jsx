import './recordInformation.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RecordInformation_Records({closeModal, userData, branch, transactionID}) {

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  };
  const [dataItems, setDataItems] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    const data = new FormData();
    data.append('transactionID', transactionID);
    data.append('branch', branch);

    axios.post(localStorage.getItem('urlLink')+'getRecordsItems.php', data)
        .then(response => {
            setDataItems(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);

  useEffect(() => {
    const data = new FormData();
    data.append('transactionID', transactionID);
    data.append('branch', branch);

    axios.post(localStorage.getItem('urlLink')+'getRecordsInformation.php', data)
        .then(response => {
            setDataInfo(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);

  return (
    <div class="InformationTab-panel">
        <div class="InformationTab-container">
            <div class="Information-header">
                <h2> TRANSACTION INFO: {transactionID}</h2>
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> arrow_back_ios </span>
                    BACK
                </button>
            </div>

            <div class="Information-content-all">
            {dataInfo.length > 0? (<div>
              {dataInfo.map((item, index) => (
            <div class="Information-footer">
              <div class="Information-footer-info">
                <div>
                <div class="totalAmount">
                  <h3> TOTAL AMOUNT:</h3>
                  <h1> {formatPrice(item.totalAmount)}</h1>
                </div>
                <div class="otherAmount">
                <label><h2>PAYMENT: </h2> <h2>{formatPrice(item.payment)}</h2></label>
                <label><h2>CHANGE: </h2> <h2>{formatPrice(item.change)}</h2></label>
                <label><h2>TAX VAT: </h2> <h2>{formatPrice(item.taxVat)}</h2></label>
                <label><h2>DISCOUNT: </h2> <h2>{formatPrice(item.discount)}</h2></label>
                </div>
                </div>
                <br />
                <div class="otherInfo">
                <p> PAYMENT MODE: {item.modeOfPayment} </p>
                <p> CASHIER: {item.cashier}  </p>
                <br/>
                <p> CUSTOMER: {item.customer}  </p>
                <p> DATE: {item.date} - TIME: {item.time}</p>
                </div>
              </div>

              <hr />
            </div>
          ))} </div> ): (<div class="bulletinBoard-empty"> - </div>)}
            <div class="Information-content">
              <div class="Information-content-header">
                <p> NAME </p>
                <p> PRICE </p>
                <p> QUANTITY </p>
              </div>
              <hr />


              <div class="Information-added-item-list">
              {dataItems.length > 0? (<div>
                {dataItems.map((item, index) => (<div>
              <div class="Information-added-item" title={" - ITEM INFO -\n" + "ID: " + item.itemID + "\n" + "TYPE: " + item.itemType} >
                  <p name="productName"> {item.itemName} </p>
                  <p name="productPrice"> {formatPrice(item.itemPrice)} </p>
                <div class="Information-added-item-options">
                  <input type='text' value={item.itemQuantity} />
                </div>
              </div>
              <hr />
              </div>
            ))} </div> ): (<div class="bulletinBoard-empty"> EMPTY </div>)}

            </div>

            </div>

            
 
        </div>
        </div>
    </div>
  )
}

export default RecordInformation_Records