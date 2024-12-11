import './informationTabInventory.css'
import itemLogo from '../../assets/itemLogo.png'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ModalEdit from './modalEditItem'

function InformationTabInventory_Inventory({closeModal, userData, itemID, itemName, itemIdentifier}) {
  const [openModalEdit, setModalEdit] = useState(false)

  const [openTransaction, setTransaction] = useState(true)
  const [openInventory, setInventory] = useState(false)

  const toggleTransaction = () => {
    setInventory(false)
    setTransaction(true)
  }
  
  const toggleInventory = () => {
    setTransaction(false)
    setInventory(true)
  }

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
    data.append('itemID', itemID);
    data.append('itemName', itemName);
    data.append('itemBranch', userData.branch);

    axios.post(localStorage.getItem('urlLink')+'getInventoryItemInfo.php', data)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);

const [dataTrans, setDataTrans] = useState([]);

useEffect(() => {
  const data = new FormData();
  data.append('itemID', itemID);
  data.append('branch', userData.branch);

  axios.post(localStorage.getItem('urlLink')+'getInventoryItemTrans.php', data)
      .then(response => {
        setDataTrans(response.data);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
}, []);


const [dataInvent, setDataInvent] = useState([]);

useEffect(() => {
  const data = new FormData();
  data.append('identifier', itemIdentifier);
  data.append('branch', userData.branch);

  axios.post(localStorage.getItem('urlLink')+'getItemUpdates.php', data)
      .then(response => {
        setDataInvent(response.data);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
}, []);


  
  return (
    <div class="informationTabInventory-panel">
        <div class="wholeTabInventory">
            <div class="informationTabInventory-header">
                <h2> ITEM INFORMATION</h2> <button onClick={()=> closeModal(false)}> CLOSE </button>
            </div>

            <div class="informationTab-All">

            <div class="informationTabInventory-content">
            {data.length > 0? (
            <div>
        {data.map((item, index) => (
              <div class="informationHeader">
                <div class="informationDetail">
                   <img src={item.itemImage} />
                   <label> ID{item.itemID} {itemIdentifier} </label>
                </div>

                <div class="informationDataList">
                 <div class="informationDataName">
                  <label> <h3>Name: </h3> <h4> {item.itemName} </h4></label>
                  <label> <h3>Price: </h3> <h4>{formatPrice(item.itemPrice)}</h4></label>
                 </div>
                <div class="informationDataQuantity">
                  <div class="firstLine">
                    <label>
                      {item.itemType === 'Grooming' || item.itemType === 'Treatment' || item.itemType === 'Examination'?
                  ('-') : (<p> QUANTITY: {item.itemQuantity}</p>)}
                    </label>
                    <label>
                      <p> SOLD: </p>
                      <p> {item.itemSold}</p>
                    </label>
                  </div>
                  <hr />
                  <div class="secondLine">
                    <label> Category: {item.itemType}</label>
                    <label> Branch: {item.itemBranch}</label>
                  </div>
                </div>


                </div>
                <div class="informationTabInventory-footer">
                  <button onClick={()=> {setModalEdit(true)}}> EDIT ITEM</button>
                </div>
              </div>))}
        </div>): (<div class="informationTabInventory-empty"> <label> EMPTY </label></div>)}


            </div>

            <div class="informationTab-details">
              <div class="informationTab-header">
                <button value={openTransaction} onClick={toggleTransaction}> TRANSACTION RECORDS </button>
                   <div style={{display: 'none'}}>
                   <button value={openInventory} onClick={toggleInventory}> INVENTORY UPDATES</button>
                   </div>
              </div>
              <hr />


              {openTransaction &&
              <div class="informationTab-transaction">

                <div class="informationTab-transaction-header">
                  <label style={{ width: '10rem', marginRight: '0rem' }}> TRANSACTION ID</label>
                  <label> QUANTITY</label>
                  <label style={{ width: '6rem' }}> DATE</label>
                </div>

                <div class="informationTab-transaction-list">

                {dataTrans.length > 0? (
                  <div>
                    {dataTrans.map((item, index) => (

                <div class="informationTab-transaction-listitems">
                  <label style={{ width: '10rem' }}> {item.transactionID}</label>
                  <label style={{ marginRight: '-4rem' }}> {item.itemQuantity}</label>
                  <label style={{ width: '6rem' }}> {item.date}</label>
                </div>

                ))}
                </div>): (<div class="informationTabInventory-empty"> <label> EMPTY </label></div>)}
        
              </div>
              </div>
            }

              {openInventory &&
              <div class="informationTab-inventory">
                
                <div class="informationTab-transaction-header">
                  <label style={{ width: '10rem' }}> UPDATE ID</label>
                  <label style={{ width: '8rem' }}> USER </label>
                  <label style={{ width: '12rem' }}> CHANGES </label>
                  <label style={{ width: '6rem' }}> DATE</label>
                </div>

                <div class="informationTab-transaction-list">

                {dataInvent.length > 0? (
                  <div>
                    {dataInvent.map((item, index) => (

                <div class="informationTab-transaction-listitems" title={item.information}>
                  <label style={{ width: '10rem'}}> {item.updateID}</label>
                  <label style={{ width: '8rem' }}> {item.role} </label>
                  <label style={{ width: '10rem' }}> {item.action} </label>
                  <label style={{ width: '6rem' }}> {item.date}</label>
                </div>

                ))}
                </div>): (<div class="informationTabInventory-empty"> <label> EMPTY </label></div>)}
        
              </div>
              </div>}





            </div>



            {openModalEdit && <div>
            {data.length > 0? (
            <div>
        {data.map((item, index) => (
              <ModalEdit closeModal={setModalEdit} userData={userData} identifier={item.identifier} itemID={item.itemID} itemImage={item.itemImage} itemName={item.itemName} itemType={item.itemType}  itemPrice={item.itemPrice} itemQuantity={item.itemQuantity}/> 
            ))}
            </div>): (<div class="informationTabInventory-empty"></div>)}
            </div>}

        </div>
    </div>
    </div>
  )
}

export default InformationTabInventory_Inventory;