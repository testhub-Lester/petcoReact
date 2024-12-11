import './modalDeleteAccount.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function DeleteAccount_Modal({closeModal}){

    const [data, setData] = useState([]);

    useEffect(() => {
        const formData = new FormData();
        formData.append('userID', '');
        axios.post(localStorage.getItem('urlLink')+'Account_DeleteAccountList.php', formData)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const deleteAccount = (id) => {
        const formData = new FormData();
        formData.append('id', id);
        axios.post(localStorage.getItem('urlLink')+'Account_DeleteAccount.php', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
          alert('ACCOUNT DELETED')
          window.location.reload()
          closeModal(false)
        }

    return (
        <div class="deleteAccount-container">
            <div class="deleteAccount-modal">
            <div class="deleteAccount-header">
                <h2> DELETE ACCOUNT </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }
            </div>

            <div class="deleteAccount-content">
                <div class="deleteAccount-content-header">
                    <label> ID </label>
                    <label> USERNAME </label>
                    <label> ROLE </label>
                    <label> BRANCH </label>
                    <label> - </label>
                </div>
                <div class="deleteAccount-content-list">
                    
                {data.length > 0? (<div>
                    {data.map((item, index) => (
                <div class="deleteAccount-content-items">
                    <label> ID{item.id} </label>
                    <label> {item.username} </label>
                    <label> {item.role}</label>
                    <label> {item.branch} </label>
                    <label> <button onClick={()=> deleteAccount(item.id)}> DELETE </button></label>
                </div>
                    ))}
                    </div> ): (<div></div>)}

                </div>



            </div>



            <div class="deleteAccount-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> arrow_back_ios </span>
                BACK
                </button>
            </div>
            </div>
        </div>
    )
}

export default DeleteAccount_Modal