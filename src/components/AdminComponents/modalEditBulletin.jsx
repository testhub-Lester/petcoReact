import './modalEditBulletin.css'
import axios from 'axios';
import React, { useState } from 'react';

const ModalEditBulletin_Dashboard=({closeModal})=> {

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

    const tag = 'bulletin'
    const [bulletinContent, setbulletinContent] = useState('');
    const created_author = 'ADMIN'
    const created_date = dateToday
    const created_time = time

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tag', tag);
        formData.append('bulletinContent', bulletinContent);
        formData.append('created_author', created_author);
        formData.append('created_date', created_date);
        formData.append('created_time', created_time);

        axios.post(localStorage.getItem('urlLink')+'editBulletin.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        alert('BULLETIN NOTE - SAVE')
        handleNotif()
        window.location.reload()
        closeModal(false)
    };

    const handleNotif = () => {
        const data = new FormData();
        data.append('notifType', 'BulletinBoard');
        data.append('notifAuthor', 'ADMIN');
        data.append('branch', 'ALL');
        data.append('notifContent', bulletinContent);
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
        <div class="editBulletin-container">
            <div class="editBulletin-panel">
            <div class="editBulletin-header">
                <h1>
                    <i class='bx bx-edit'></i>
                    BULLETIN - ADD NOTE
                </h1>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : ''  }
            </div>
            <form onSubmit={handleSubmit}>
                
                <div class="editBulletin-content">
                <textarea value={bulletinContent} onChange={(e) => setbulletinContent(e.target.value)} required/>
                </div>
                    <div class="editBulletin-footer">
                        <button class="cancel" onClick={() => {closeModal(false);}}>
                            <span class="material-symbols-sharp"> cancel </span>
                            CANCEL
                        </button>
                        <button type="submit" class="save">
                            <span class="material-symbols-sharp"> save </span>
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditBulletin_Dashboard;