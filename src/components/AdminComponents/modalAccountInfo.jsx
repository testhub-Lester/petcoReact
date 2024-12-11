import './modalAccountInfo.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalEdit from './modalEditAccount'

function AccountInfo_Modal({closeModal, id}){
    const [openModal, setModal] = useState(false)
    // Backend
    const [data, setData] = useState([]);

    useEffect(() => {
        const formData = new FormData();
        formData.append('id', id);
        axios.post(localStorage.getItem('urlLink')+'Account_Information.php', formData)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const [showPass, setshowPass] = useState(false)

    return (
        <div class="accountInfo-container">
                        {data.length > 0? (<div>
                            {data.map((item, index) => (
            <div class="accountInfo-modal">
            <div class="accountInfo-header">
                <h2> ACCOUNT INFORMATION </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }


            </div>

            <div class="accountInfo-content">

                <div class="AccountInformation-content">
                <h2> ACCOUNT INFORMATION</h2>
                <label> Username:<p> {item.username}</p></label>
                <label> Password:
                    {showPass ? <p style={{ width:'10rem'}}> {item.password} </p> : <p style={{ width:'10rem'}}>*******</p>}
                    <button onClick={()=> setshowPass(!showPass)}>
                    {showPass ? 'HIDE': ' SHOW'}
                    </button>
                </label>
                <hr />
                <label> Role: {item.role} </label>
                <label> Branch: {item.branch} </label>
                </div>

                <div class="PersonalInformation-content">
                    
                <h2> PERSONAL INFORMATION</h2>
                <label> Firstname: {item.Firstname} </label>
                <label> Lastname: {item.Lastname}</label>
                <hr />
                <label> Birthday: {item.Birthday}</label>
                <label> Email: {item.Email} </label>
                <label> Phone Number: {item.PhoneNumber}</label>
                </div>

            </div>



            <div class="accountInfo-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel</span>
                CLOSE
            </button>
            <button class="save" onClick={() => {setModal(true)}}>
                <span class="material-symbols-sharp"> edit </span>
                EDIT ACCOUNT
            </button>
            </div>

            {openModal && <ModalEdit closeModal={setModal}
            idA={item.id}
            usernameA={item.username}
            passwordA={item.password}
            branchA={item.branch}
            roleA={item.role}
            FirstnameA={item.Firstname}
            LastnameA={item.Lastname}
            BirthdayA={item.Birthday}
            EmailA={item.Email}
            PhoneNumberA={item.PhoneNumber}
            /> }
            </div>
                    ))}
                    </div> ):
                    (<div> </div>)}
        </div>
    )
}

export default AccountInfo_Modal