import './socialMedia.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditModal from './modalEditSocialMedia'

function SocialMedia_Dashboard({userData}) {
    const [openModal, setModal] = useState(false);

    return (
        <div class="socialMediaPanel">
            <div class="socialMedia-header">
            <h2> SOCIAL MEDIA </h2>
            <button onClick={() => {setModal(true);}}> EDIT </button> 
            </div>
            <div class="socialMedia-info">
                <a href="/">
                <i class='bx bxl-facebook' ></i>
                </a>
                <a href="/">
                <i class='bx bxl-instagram' ></i>
                </a> 
                <a href="/">
                <i class='bx bx-store'></i>
                </a>
                
            </div>
            {openModal && <EditModal closeModal={setModal} branch={userData.branch}/>}
        </div>
    )
}

export default SocialMedia_Dashboard