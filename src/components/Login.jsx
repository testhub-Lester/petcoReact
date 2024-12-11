import '../assets/login.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Protected from './ProtectedRoute'
import AppHeader from './App-Header'
import logo from '../assets/logo.png'

import LoadingIndicator from "../assets/LoadingIndicator";

import ModalForgetPassword from './forgetPassword'

function Login() {
  localStorage.setItem('urlLink', 'http://localhost/backend/')

  const [showForgetPassword, setshowForgetPassword] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageShow, setMessageShow] = useState('');
    const [loading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(5);
    const [loadingTime, setLoadingTime] = useState(0);
    const [key, setKey] = useState(0);
    const navigate = useNavigate();
  
    const handleLogin =(event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      axios.post(localStorage.getItem('urlLink')+'login.php', formData)
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          alert.error('There was an error logging in!', error);
        });
    };

    const [accID, setaccID] = useState('');
    const [accRole, setaccRole] = useState('');
    const [accBranch, setaccBranch] = useState('');
    const getAccountInfo =() => {
        const formData = new FormData();
        formData.append('username', username);
        axios.post(localStorage.getItem('urlLink')+'Login_AccountInfo.php', formData)
          .then(response => {
            setaccID(response.data.id);
            setaccRole(response.data.role);
            setaccBranch(response.data.branch);
          })
          .catch(error => {
            alert.error('There was an error logging in!', error);
          });
      };

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
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('active', 'ONLINE');
        formData.append('activeTimeDate', TimeDate);
        axios.post(localStorage.getItem('urlLink')+'Account_ActiveStatus.php', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            alert.error('There was an error logging in!', error);
          });
      };

    useEffect(() => {
        if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds + 1), 1000);
          return () => {
            clearTimeout(timer);
            if (message == 'Login Successful'){
                setLoadingTime(0)
                setLoadingTime(loadingTime + 1);
                setLoading(true)
                setMessageShow('Loggin in..')
                getAccountInfo()
                accountStatus()
                console.log(loadingTime)
                if (loadingTime == 2) {
                    setMessageShow('Loading User Info')
                    localStorage.setItem('id', accID)
                    localStorage.setItem('name', username)
                    localStorage.setItem('role', accRole)
                    localStorage.setItem('branch', accBranch)
                }
                if (loadingTime == 3 && accRole === 'Cashier') {
                    setLoading(false)
                    setMessageShow('Login Successful')
                }

                
                if (loadingTime == 3 && accRole === 'Manager') {
                  setLoading(false)
                  setMessageShow('Login as Manager: ' + accBranch)
                }

                if (loadingTime == 3 && accRole === 'Admin') {
                    setLoading(false)
                    setMessageShow('Login as ADMIN')
                }

                if (loadingTime == 4 && accRole === 'Cashier') {
                    setSeconds(0);
                    setLoading(false);
                    navigate('/LoginAccountCashier')
                    window.location.reload();
                }

                if (loadingTime == 4 && accRole === 'Manager') {
                  setSeconds(0);
                  setLoading(false);
                  navigate('/Admin')
                  window.location.reload();
              }

                if (loadingTime == 4 && accRole === 'Admin') {
                    setSeconds(0);
                    setLoading(false);
                    navigate('/Admin')
                    window.location.reload();
                }

                if (loadingTime == 5) {
                    setLoading(false);
                }
            }else if (message == 'Invalid username or password') {
                setLoading(true);
                setLoadingTime(0)
                setLoadingTime(loadingTime + 1);
                if (loadingTime == 1) {

                    setMessageShow('Invalid username or password')
                }
                if (loadingTime == 2) {
                    setMessage('')
                    setUsername('')
                    setPassword('')
                    setLoading(false)
                    setLoadingTime(0)
                    setMessageShow('')
            }
            }
          };
        }

    }, [seconds, messageShow]);
  
    return (
        <div class="appMain">
            <div class="login-background">
            </div>
            <AppHeader userData={[]}/>
            {showForgetPassword ? <ModalForgetPassword closeModal={setshowForgetPassword}/> : 


            <div class="login-container">
            <div class="form-container">
            <form onSubmit={handleLogin} class="form-panel">
              <div class="login-header">
                <img src={logo} />
                <label> PETCO ANIMAL CLINIC</label>
              </div>
            <input className="form-input" type="text" value={username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} required />
            
            <input className="form-input" type="password" value={password} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} required />

            <button className="form-button" type="submit">
                LOG-IN
            </button>
            {loading && <div>
                <LoadingIndicator />
               </div>}
            <div key={key}><p> {messageShow} </p></div>
            <hr />

        </form>
        {loadingTime == 0 ? 
        <div class="forgetPassword-inlogin">
              <button onClick={()=> setshowForgetPassword(true)}> FORGOT PASSWORD? </button>
            </div>
            : ''}

            </div>
        </div>
        }
    </div>
    )
}

export default Login