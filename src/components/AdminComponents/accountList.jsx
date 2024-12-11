import './accountList.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import CreateModal from './modalCreateAccount'
import DeleteModal from './modalDeleteAccount'
import AccountInfoModal from './modalAccountInfo'

function AccountList_Panel() {
    const [key, setKey] = useState(0);
    const [openCreateModal, setCreateModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [openAccountInfo, setAccountInfo] = useState(false)

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(localStorage.getItem('urlLink')+'getAccount.php')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const [id, setID] = useState();

    return (
        <div class="accountList-panel">
            <div class="accountList-header">
                <h2> ACCOUNT LIST</h2>
                <div class="accountList-option">
                    <button onClick={() => {setCreateModal(true);}}> CREATE </button>
                    <button onClick={() => {setDeleteModal(true);}}> DELETE </button>
                </div>
            </div>

            <div class="accountList-list">
            <div class="accountList-head">
                        <p> NAME </p>
                        <label> BRANCH </label>
                        <label> ROLE </label>
                        <label> DETAILS </label>
                        </div>

                    {data.length > 0? (<div>
                        {data.map((item, index) => (<div class="accountList-content">

                        <p title={"FULLNAME: \n" + item.Firstname + " , " + item.Lastname}> {item.username} </p>
                        <label> {item.branch} </label>
                        <label> {item.role}</label>
                        <label> <button onClick={() => {setAccountInfo(true); setID(item.id);        setKey(prevKey => prevKey + 1);}}> SHOW MORE</button> </label>

                        </div>))}
                    </div> ):
                    (<div class="bulletinBoard-empty"> EMPTY </div>)}

            </div>

            {openCreateModal && <CreateModal closeModal={setCreateModal} id={id}/>}
            {openDeleteModal && <DeleteModal closeModal={setDeleteModal}/>}
            {openAccountInfo && <div key={key}><AccountInfoModal closeModal={setAccountInfo} id={id}/> </div>}
        </div>
    )
}

export default AccountList_Panel