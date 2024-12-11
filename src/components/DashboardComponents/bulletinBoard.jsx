import './bulletinBoard.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Bulletinboard_Dashboard(){
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

    return(
        <div class="bulletinPanel">
        <div class="bulletinPanel">
            <div class="bulletin-header">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    BULLETIN BOARD
                    {data.length > 0 ? <p>{data.length}</p> : '' }
                </h2>
            </div>
            <div class="bulletin-info">
            {data.length > 0? (<div>
                {data.map((item, index) => (

<div class="bulletinAdmin-info-container">
                        
<div  class="bulletinAdmin-info-content">
    <div class="bulletinAdmin-info-content-header">
    <label class="authorTitle">ADMIN</label>
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
                    (<div> </div>)}
            </div>
        </div>
        </div>
    )
}