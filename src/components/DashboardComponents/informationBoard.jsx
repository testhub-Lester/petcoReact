import './informationBoard.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditModal from './modalEditInformation'

export default function Information_Dashboard({userData}){
    const [openModal, setModal] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        const data = new FormData();
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'getInformation.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const deleteInfo = (id) => {
        const formData = new FormData();
        formData.append('id', id);

        axios.post(localStorage.getItem('urlLink')+'InformationBoard_deleteNote.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        alert('NOTE - DELETED')
        window.location.reload()
    };

    
    
    return(
        <div class="informationPanel">
            <div class="information-header">
                <h2 style={{ display: 'flex', marginRight: '1rem', alignItems: 'center', gap: '1rem'}}>
                    INFORMATION BOARD
                    {data.length > 0 ? <p>{data.length}</p> : '' }
                </h2>
                <button onClick={() => {setModal(true);}}> ADD NOTE </button> 
            </div>
            <div class="information-info">
            {data.length > 0? (<div>
                {data.map((item, index) => (
                    <div class="information-info-container">

                    <div  class="information-info-content">
                        <div class="information-info-content-header">
                        <label class="authorTitle"><p>{item.branch}:</p><p>{item.created_author}</p></label>
                        <button onClick={()=> deleteInfo(item.id)}> DELETE NOTE </button>
                        </div>
                        <hr />
                        <textarea value={item.informationContent} class="content"></textarea>

                        <label class="date">
                            <p>Time: {item.created_time}</p>
                            <p>Date: {item.created_date}</p>
                        </label>

                    </div>

                    </div>
                    ))}
                    </div> ):
                (<div></div>)}
            </div>
            {openModal && <EditModal closeModal={setModal} userData={userData}/>}
        </div>
    )
}