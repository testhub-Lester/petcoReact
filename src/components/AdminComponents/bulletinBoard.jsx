import './bulletinBoard.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditModal from './modalEditBulletin'

export default function Bulletinboard_Dashboard(){
    const [openModal, setModal] = useState(false);

    //Backend
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(localStorage.getItem('urlLink')+'getBulletin.php')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const deleteBulletin = (id) => {
        const formData = new FormData();
        formData.append('id', id);

        axios.post(localStorage.getItem('urlLink')+'BulletinBoard_deleteNote.php', formData)
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
        <div class="bulletinAdminPanel">
            <div class="bulletinAdmin-header">
                <h2>BULLETIN BOARD</h2>
                <button onClick={() => {setModal(true);}}> ADD NOTE </button> 
            </div>
            <div class="bulletinAdmin-info">
                {data.length > 0? (<div>
                {data.map((item, index) => (
                    
                    <div class="bulletinAdmin-info-container">
                        
                        <div  class="bulletinAdmin-info-content">
                            <div class="bulletinAdmin-info-content-header">
                            <label class="authorTitle">ADMIN</label>
                            <button onClick={()=> deleteBulletin(item.id)}> DELETE NOTE </button>
                            </div>
                            <hr />

                            <textarea value={item.bulletinContent} class="content"></textarea>

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
            {openModal && <EditModal closeModal={setModal}/>}
        </div>
    )
}