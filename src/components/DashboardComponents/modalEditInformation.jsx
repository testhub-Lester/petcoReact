import './modalEditInformation.css'
import axios from 'axios';
import React, { useState } from 'react';

const ModalEditInformation_Dashboard=({closeModal, userData})=> {
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year + "-" + monthA + "-" + dayA);

    const currentTime = new Date();
    const hr = currentTime.getHours();
    const hour = hr < 10 ? `0${hr}` : hr;
    const min = currentTime.getMinutes();
    const time = (hour + ":" + min);

    const branch = userData.branch
    const [informationContent, setinformationContent] = useState('');
    const created_author = userData.name
    const created_date = dateToday
    const created_time = time

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('branch', branch);
        formData.append('informationContent', informationContent);
        formData.append('created_author', created_author);
        formData.append('created_date', created_date);
        formData.append('created_time', created_time);

        axios.post(localStorage.getItem('urlLink')+'editInformation.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        alert('INFORMATION NOTE - SAVE')
        handleNotif()
        window.location.reload()
        closeModal(false)
    };

    
    const handleNotif = () => {
        const data = new FormData();
        data.append('notifType', 'InformationBoard');
        data.append('notifAuthor', userData.name);
        data.append('branch', userData.branch);
        data.append('notifContent', informationContent);
        data.append('notifDateTime', 'DATE: ' + created_date + '- TIME: ' + created_time);
        data.append('notifRead', 'unread');

        axios.post(localStorage.getItem('urlLink')+'addToNotification.php', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div class="editInformation-container">
            <div class="editInformation-panel">
            <div class="editInformation-header">
                <h1>
                    <i class='bx bx-edit'></i>
                    ADD NOTE: {userData.branch}
                </h1>

                {null ? <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                    </button>: ''}


            </div>
            <form onSubmit={handleSubmit}>
            <div class="editInformation-content">
            <textarea value={informationContent} onChange={(e) => setinformationContent(e.target.value)} required/>
            </div>
            <div class="editInformation-footer">
                <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button type="submit" class="save">
                <span class="material-symbols-sharp"> add_circle </span>
                ADD
                </button>
            </div>
            </form>
            </div>
        </div>
    )
}

export default ModalEditInformation_Dashboard;