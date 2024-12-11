import './informationTabInventory.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ModalEdit from './modalEditItem'

function InformationTabInventory_Inventory({closeModal, branch, userData ,itemID, itemName, itemIdentifier}) {
  const [openModalEdit, setModalEdit] = useState(false)

  const [openTransaction, setTransaction] = useState(true)
  const [openInventory, setInventory] = useState(false)

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
    data.append('itemBranch', branch);

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
  data.append('branch', branch);

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
  data.append('branch', branch);

  axios.post(localStorage.getItem('urlLink')+'getItemUpdates.php', data)
      .then(response => {
        setDataInvent(response.data);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
}, []);

const restoreItem = (id) => {
  itemUpdate()
  const formData = new FormData();
  formData.append('itemID', id);
  axios.post(localStorage.getItem('urlLink')+'Inventory_RestoreDeletedItem.php', formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    alert('ITEM RESTORED')
    window.location.reload()
    closeModal(false)
  }
  
  const itemUpdate = () => {
    const uID = 'UID' + dayA + monthA + "-" + num1 + num2 + num3 + num4
    const formData = new FormData();
    formData.append('updateID', uID);
    formData.append('identifier', itemIdentifier);
    formData.append('itemName', itemName);
    formData.append('itemBranch', branch);
    formData.append('role', userData.name);
    formData.append('action', 'RESTORED');
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

  return (
    <div class="informationTabInventory-panel">
        <div class="wholeTabInventory">
            <div class="informationTabInventory-header">
                <h2> ITEM INFORMATION : {branch}</h2> <button onClick={()=> closeModal(false)}> CLOSE </button>
            </div>

            <div class="informationTab-All">

            <div class="informationTabInventory-content">
            {data.length > 0? (
            <div>
        {data.map((item, index) => (
              <div class="admin-informationHeader" value={item.deleted}>
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
                <div class="admin-informationTabInventory-footer">
                  {item.deleted == 'deleted' ?
                  <div class="admin-info-itemDeleted"> 
                  <label style={{backgroundColor: 'red', padding: '1rem', fontSize: '1.5rem'}}> ITEM IS DELETED </label>
                  <button onClick={() => restoreItem(itemID)}> RESTORE ITEM </button>
                  </div>
                  :
                  <button onClick={()=> {setModalEdit(true)}}>
                    EDIT ITEM
                  </button>}
                </div>
              </div>))}
        </div>): (<div class="informationTabInventory-empty"> <label> EMPTY </label></div>)}


            </div>

            <div class="informationTab-details">
              <div class="informationTab-header">
                <button value={openTransaction} onClick={toggleTransaction}> TRANSACTION RECORDS </button>
                <button value={openInventory} onClick={()=> {toggleInventory(); console.log(dataInvent)}}> INVENTORY UPDATES</button>
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
              <ModalEdit closeModal={setModalEdit} branch={branch} userData={userData} identifier={item.identifier} itemID={item.itemID} itemImage={item.itemImage} itemName={item.itemName} itemType={item.itemType}  itemPrice={item.itemPrice} itemQuantity={item.itemQuantity}/> 
            ))}
            </div>): (<div class="informationTabInventory-empty"></div>)}
            </div>}

        </div>
    </div>
    </div>
  )
}

export default InformationTabInventory_Inventory;