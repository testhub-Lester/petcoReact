import './forgetPassword.css'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'

function ForgetPassword ({closeModal}) {

    const [showEmailVerify, setshowEmailVerify] = useState(true)
    const [showToReset, setshowToReset] = useState(false)

    const [inputtedEmail, setinputtedEmail] = useState('')

    
    const [dataEmail, setdataEmail] = useState([]);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year+ monthA + dayA);
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const num3 = Math.floor(Math.random() * 9) + 1;
    const num4 = Math.floor(Math.random() * 9) + 1;
    
    const changepass = dateToday + "" + num1 + "" + num2 + "" + num3 + "" + num4

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_2rea388', 'template_8031xiw', form.current, {
          publicKey: 'COdWUFuv4aQY6FFJL', 
        })
        .then(
          () => {
            alert('SUCCESS!');
            setNewPassword()
            closeModal(false)
          },
          (error) => {
            alert('FAILED...');
          },
        );
    };
    const getAccountInfo =() => {
        const formData = new FormData();
        formData.append('Email', inputtedEmail);
        axios.post(localStorage.getItem('urlLink')+'Account_VerifyEmail.php', formData)
          .then(response => {
            setdataEmail(response.data);
          })
          .catch(error => {
            alert.error('There was an error logging in!', error);
          });
          if (dataEmail.length == 1) {
            setshowEmailVerify(false)
          }else{
            alert('Email is not connected to any user')
            setshowEmailVerify(true)
          }
      };

      const setNewPassword =() => {
        const formData = new FormData();
        formData.append('Email', inputtedEmail);
        formData.append('password', changepass);

        axios.post(localStorage.getItem('urlLink')+'Account_UpdatePassword.php', formData)
          .then(response => {
            alert(response.data);
          })
          .catch(error => {
            alert.error('There was an error', error);
          });
      };

    return (<div class="forgetPassword-container">
        <div class="forgetPassword-panel">

            {showEmailVerify ? 
            <div class="forgetPassword-email">
                <div class="forgetPassword-email-header">
                <label>FORGOT PASSWORD</label>
                </div>

                <div class="forgetPassword-email-content">
                    <label> Please enter your email to search for your account</label>
                    <input type='text' value={inputtedEmail}  onChange={(e)=> {setinputtedEmail(e.target.value);}}/>
                </div>

                <div class="forgetPassword-email-footer">
                <button onClick={()=>closeModal(false)} style={{ backgroundColor: 'red'}}> BACK</button>
                {showToReset ? ''
                :
                <button onClick={()=> getAccountInfo()} style={{ backgroundColor: 'green'}}> VERIFY</button>
                }

                </div>
            </div>
            :
            <div class="forgetPassword-reset">
                <div class="forgetPassword-reset-header">
                <label>RESET PASSWORD</label>
                </div>

                <div class="forgetPassword-reset-content">
                    <label> NEW PASSWORD WOULD BE SEND TO YOUR EMAIL </label>
                    {dataEmail.length > 0? (<div>
                {dataEmail.map((item, index) => (
                    
                    <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' ,width: '30rem'}}>
                        <div style={{ display: 'flex', alignContent: 'center', gap: '1rem'}}>
                        <label style={{ fontSize: '1.5rem'}}>USERNAME:</label>
                        <input type="text" name="user_name" value={item.username} style={{ all: 'unset', fontSize: '1.5rem', color: 'gray', width: '100%'}}/>
                        </div>
                        
                        <div style={{ display: 'flex', alignContent: 'center', gap: '1rem'}}>
                        <label style={{ fontSize: '1.5rem'}}>EMAIL: </label>
                        <input type="email" name="user_email" value={inputtedEmail} style={{ all: 'unset', fontSize: '1.5rem', color: 'gray', width: '100%'}}/>
                        </div>

                        <div style={{ display: 'flex', alignContent: 'center', gap: '1rem'}}>
                        <label style={{ fontSize: '.2rem', width: '20rem', color: 'white'}}>NEW PASSWORD: </label>
                        <textarea name="message" value={changepass} style={{ all: 'unset', fontSize: '.2rem', color: 'white', width: '100%'}}/>
                        </div>
                        <div class="fogerPassword-restButton">
                        <input type="submit" value="RESET PASSWORD" />
                        </div>
                        </form>
                ))}
                </div> ):
                (<div> </div>)}
                </div>

                <div class="forgetPassword-reset-footer">
                <button onClick={()=>closeModal(false)} style={{ backgroundColor: 'red'}}> BACK TO LOGIN</button>
                {showToReset ? ''
                :''
                }

                </div>
            </div>
            }
    </div>
    </div>)
}

export default ForgetPassword