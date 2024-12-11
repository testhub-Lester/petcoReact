import './modalCreateAccount.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CreateAccount_Modal({closeModal}){

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() - 20;
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const getDate = (year + "-" + monthA + "-" + dayA);

    const [seconds, setSeconds] = useState(1);
    useEffect(() => {
        if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds + 1), 100);
          return () => {
            {checkUsername.length == 1 ? setinputUsername(1) : setinputUsername(5)}
            {checkEmail.length == 1 ? setinputEmail(1) : setinputEmail(5)}
            {Birthday < getDate ? setcheckBirthday(true) : setcheckBirthday(false)}
          };
        }
    }, [seconds]);

    const handleSelecChangeA =(event)=>{
        setrole(event.target.value)
    }

    const handleSelecChangeB =(event)=>{
        setbranch(event.target.value)
    }

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [branch, setbranch] = useState('');
    const [role, setrole] = useState('');

    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Birthday, setBirthday] = useState('2000-01-01');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');

    const [checkBirthday, setcheckBirthday] = useState(false)

    const [inputUsername, setinputUsername] = useState(0)
    const [inputEmail, setinputEmail] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        dbCheckUsername()
        dbCheckEmail()
        {checkUsername.length == 1 ? setinputUsername(1) : setinputUsername(5)}
        {checkEmail.length == 1 ? setinputEmail(1) : setinputEmail(5)}
        {Birthday < getDate ? setcheckBirthday(true) : setcheckBirthday(false)}
        if (checkUsername != '' && inputUsername == 5 && checkEmail != '' && inputEmail == 5){
            createTheAccount()
        }
    };

    const [checkUsername, setcheckUsername] = useState([])
    const dbCheckUsername = () => {
        const formData = new FormData();
        formData.append('username', username);

        axios.post(localStorage.getItem('urlLink')+'Account_checkUsername.php', formData)
            .then(response => {
                setcheckUsername(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }

    const [checkEmail, setcheckEmail] = useState([])
    const dbCheckEmail = () => {
        const formData = new FormData();
        formData.append('Email', Email);

        axios.post(localStorage.getItem('urlLink')+'Account_checkEmail.php', formData)
            .then(response => {
                setcheckEmail(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }

    const createTheAccount = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('branch', branch);
        formData.append('role', role);

        formData.append('Firstname', Firstname);
        formData.append('Lastname', Lastname);
        formData.append('Birthday', Birthday);
        formData.append('Email', Email);
        formData.append('PhoneNumber', PhoneNumber);


        axios.post(localStorage.getItem('urlLink')+'createAccount.php', formData)
            .then(response => {
                alert.log(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
            });
            alert('Account Created')
            window.location.reload()
            closeModal(false)
    }
    return (
        <div class="createAccount-container">
            <div class="createAccount-modal">
            <div class="createAccount-header">
                <h2> CREATE ACCOUNT </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }


            </div>


            <form onSubmit={handleSubmit}>

            <div class="createAccount-content">
            <h1> ACCOUNT INFORMATION</h1>
                <div class="createAccount-List">
                <div class="createAccountIdentity">
                <label id={""+inputUsername}> Username: {inputUsername == 1 ? 'ALREADY TAKEN': ""}</label>
                <input type='text' id={""+inputUsername} value={username} onChange={(e) => setusername(e.target.value)} required/>
                <label> Password:</label>
                <input type='password' value={password} onChange={(e) => setpassword(e.target.value)}  required/>
                </div>

                <div class="createAccountRole">
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
                <label id={""+ checkBirthday}> Birthday: {checkBirthday ? "" : "is above 20years"} </label>
                <input type='date' id={""+ checkBirthday} value={Birthday} onChange={(e) => setBirthday(e.target.value)}  required/>
                </div>

                <div class="personalInformationOther">
                <label id={""+inputEmail}> Email: {inputEmail == 1 ? 'ALREADY TAKEN': ""}</label>
                <input type='text' id={""+inputEmail} value={Email} onChange={(e) => setEmail(e.target.value)}  required/>
                <label> Phone Number: </label>
                <input type='number' value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  required/>
                </div>

                </div>

            </div>

            <div class="createAccount-footer">
            <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button type="submit" class="save">
                <span class="material-symbols-sharp"> add_circle </span>
                CREATE
                </button>
            </div>


            </form>
            </div>
            
        </div>
    )
}

export default CreateAccount_Modal