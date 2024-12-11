import './modalEditAccount.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function editAccount_Modal({closeModal, idA, usernameA, passwordA, branchA, roleA, FirstnameA, LastnameA, BirthdayA, EmailA, PhoneNumberA}){

    const handleSelecChangeA =(event)=>{
        setrole(event.target.value)
    }

    const handleSelecChangeB =(event)=>{
        setbranch(event.target.value)
    }

    const [username, setusername] = useState(usernameA);
    const [password, setpassword] = useState(passwordA);
    const [branch, setbranch] = useState(branchA);
    const [role, setrole] = useState(roleA);

    const [Firstname, setFirstname] = useState(FirstnameA);
    const [Lastname, setLastname] = useState(LastnameA);
    const [Birthday, setBirthday] = useState(BirthdayA);
    const [Email, setEmail] = useState(EmailA);
    const [PhoneNumber, setPhoneNumber] = useState(PhoneNumberA);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username == usernameA &&
            password == passwordA &&
            branch == branchA &&
            role == roleA &&

            Firstname == FirstnameA &&
            Lastname == LastnameA &&
            Birthday == BirthdayA &&
            Email == EmailA &&
            PhoneNumber == PhoneNumberA) {
                alert('No Edit')
            }
            else {
                updateAccount()
            }

    };

    const updateAccount = () => {
        const formData = new FormData();
        formData.append('id', idA);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('branch', branch);
        formData.append('role', role);

        formData.append('Firstname', Firstname);
        formData.append('Lastname', Lastname);
        formData.append('Birthday', Birthday);
        formData.append('Email', Email);
        formData.append('PhoneNumber', PhoneNumber);

        axios.post(localStorage.getItem('urlLink')+'Account_UpdateAccount.php', formData)
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        alert('Account Editted')
        window.location.reload()
        closeModal(false)
    }

    return (
        <div class="editAccount-container">
            <div class="editAccount-modal">
            <div class="editAccount-header">
                <h2> EDIT ACCOUNT </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }
            </div>


            <form onSubmit={handleSubmit}>

            <div class="editAccount-content">
            <h1> ACCOUNT INFORMATION </h1>
                <div class="editAccount-List">
                <div class="editAccountIdentity">
                <label> Username:</label>
                <input type='text' value={username} onChange={(e) => setusername(e.target.value)} required/>
                <label> Password:</label>
                <input type='password' value={password} onChange={(e) => setpassword(e.target.value)}  required/>
                </div>

                <div class="editAccountRole">
                <label> Role: </label>
                <select id="itemSelectCategory" value={role} onChange={handleSelecChangeA} required>
                        <option> </option>
                        <option value="Cashier"> Cashier </option>
                        <option value="Manager"> Manager</option>
                        <option value="Admin"> Admin</option>
                </select>

                <label> Branch: </label>
                <select id="itemSelectCategory" value={branch} onChange={handleSelecChangeB} required>
                        <option> </option>
                        <option value="Manggahan"> Manggahan </option>
                        <option value="Parada"> Parada</option>
                        <option value="San Jose"> San Jose</option>
                </select>
                </div>
                </div>

                <hr />
                <h1> PERSONAL INFORMATION</h1>
                <div class="personalInformation-content">
                <div class="personalInformationName">
                <label> Firstname: </label>
                <input type='text' value={Firstname} onChange={(e) => setFirstname(e.target.value)}  required/>
                <label> Lastname: </label>
                <input type='text' value={Lastname} onChange={(e) => setLastname(e.target.value)}  required/>
                <label> Birthday:</label>
                <input type='date' value={Birthday} onChange={(e) => setBirthday(e.target.value)}  required/>
                </div>

                <div class="personalInformationOther">
                <label > Email: </label>
                <input type='text' value={Email} onChange={(e) => setEmail(e.target.value)}  required/>
                <label> Phone Number: </label>
                <input type='number' value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  required/>
                </div>

                </div>

            </div>

            <div class="editAccount-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button type="submit" class="save">
                <span class="material-symbols-sharp"> edit </span>
                EDIT
                </button>
            </div>

            </form>
            </div>
            
        </div>
    )
}

export default editAccount_Modal