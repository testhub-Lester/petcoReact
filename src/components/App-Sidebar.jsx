import '../assets/sidebar.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Sidebar=({userData})=>{
    const [openAdmin, setAdmin] = useState(false)
    const [seconds, setSeconds] = useState(5);

    const accountStatus =() => {
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
        const minutes = min < 10 ? `0${min}` : min;
        const timeToday = (hour + ":" + minutes);
  
        const TimeDate = timeToday + " - " + dateToday
        
        const name = localStorage.getItem('name')
        const formData = new FormData();
        formData.append('username', name);
        formData.append('active', 'OFFLINE');
        formData.append('activeTimeDate', TimeDate);
        axios.post(localStorage.getItem('urlLink')+'Account_ActiveStatus.php', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            alert.error('There was an error logging in!', error);
          });

          remove()
      };

    const remove =()=> {
        localStorage.setItem('id', '')
        localStorage.setItem('name', '')
        localStorage.setItem('role', '')
        localStorage.setItem('branch', '')
        window.location.reload();
       }
    return(
    <div>
        <div class="containers-sidebar">
        <div className="sidebar">

<nav>
                <li>
                    <Link to="/Dashboard" className='links'>
                    <div class="nav-item">
                    <span class="material-symbols-sharp"> team_dashboard </span>
                     <p> DASHBOARD</p>
                     </div>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/Cashier" className='links'>
                    <div class="nav-item">
                    <span class="material-symbols-sharp"> payments </span>
                    <p> CASHIER </p>
                    </div>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/Records" className='links'>
                    <div class="nav-item">
                    <span class="material-symbols-sharp">  receipt_long </span>
                    <p> RECORDS </p>
                    </div>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/Inventory" className='links'>
                    <div class="nav-item">
                    <span class="material-symbols-sharp"> inventory_2 </span>
                    <p> INVENTORY </p>
                    </div>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/Analytics" className='links'>
                    <div class="nav-item">
                    <span class="material-symbols-sharp"> monitoring </span>
                    <p> ANALYTICS </p>
                    </div>
                    </Link>
                    </li>
                <hr />
                
            <button>
                <Link to="/Logout" className='links' onClick={()=> {accountStatus()}}>
                   <label class="sidebar-logout">LOGOUT</label>
                </Link>
            </button>
            </nav>

        </div>
        </div>
    </div>
    )
}
export default Sidebar