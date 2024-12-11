import './modalToPrint.css'
import logo from '../../assets/logo.png'
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {useReactToPrint} from "react-to-print";

function ToPrint_Modal({closeModal, userData, paymentData}){
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [branchLocation, setbranchLocation] = useState()
    const setupLocation = () => {
        if (userData.branch == "Manggahan") {
            setbranchLocation('JRG Fuel Hub, Manggahan, Santa Maria')
        }
        if (userData.branch == "Parada") {
            setbranchLocation('#389 Parada, Santa Maria')
        }
        if (userData.branch == "San Jose") {
            setbranchLocation('San Jose')
        }
    }

    useEffect(() => {
        setupLocation()
        }, []);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const dayA = day < 10 ? `0${day}` : day;
      const monthA = month < 10 ? `0${month}` : month;
      const dateToday = (year + "-" + monthA + "-" + dayA);

    const saveAndPrint = () =>{
        updateInventory();
        reactToPrintFn();
        saveRecordItem();
        saveTransaction();
        reactToPrintFn();

        removeAllItems();
        navigate(-1)
    }

    //Backend
    const [data, setData] = useState([]);
    useEffect(() => {
        const data = new FormData();
        data.append('branch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getCurrentItemCashier.php', data)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }, []);

        const saveTransaction = () => {
            const formData = new FormData();
            formData.append('transactionID', paymentData.transactionID);
            formData.append('branch', userData.branch);
            formData.append('cashier', userData.name);
            formData.append('customer', paymentData.customer);
            formData.append('totalAmount', paymentData.total);
            formData.append('payment', paymentData.payment);
            formData.append('change', paymentData.change);
            formData.append('taxVat', 0);
            formData.append('discount', paymentData.discount);
            formData.append('modeOfPayment', paymentData.modeOfPay);
            formData.append('time', paymentData.time);
            formData.append('date', paymentData.date);
        
            axios.post(localStorage.getItem('urlLink')+'insertRecords.php', formData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    alert.error('There was an error!', error);
                });
            alert('TRANSACTION SAVED')
        }

        const removeAllItems = () => {
            const formData = new FormData();
            formData.append('branch', userData.branch);
    
            axios.post(localStorage.getItem('urlLink')+'deleteCurrenItemCashierAll.php', formData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
            });
        };

        const saveRecordItem = () => {
            const formData = new FormData();
            formData.append('transactionID', paymentData.transactionID);
            formData.append('date', dateToday);
    
            axios.post(localStorage.getItem('urlLink')+'insertRecordsItems.php', formData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        const updateInventory = () => {
    
            axios.get(localStorage.getItem('urlLink')+'decreaseQuantity.php')
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };



    
    return (
        <div class="ToPrint-container">
            <div class="ToPrint-modal">
            <div class="ToPrint-header">
                <h2> PRINT RECEIPT </h2>

                {null ?
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                </button> : '' }


            </div>
            <div class="ToPrint-content">
                <div ref={contentRef} class="ToPrint-file">
                <div class="PrintFile-header">
                    <div class="PrintFile-logo">
                        <img src = {logo} alt="Logo"/>
                        <h2> PETCO.CO</h2>
                    </div>
                    <div class="PrintFile-shopInfo">
                        <label> Petco.co Animal Clinic {userData.branch} </label>
                        <label> {branchLocation} , Bulacan</label>
                    </div>
                </div>

                <hr />

                <div class="PrintFile-content">
                    <div class="PrintFile-items">
                    {data.map((item, index) => (
                        <label>{item.currentItemName} x{item.currentItemQuantity} <div class="discountAno" style={{display: 'flex', flexDirection: 'column', alignItems:'end'}}><p>{formatPrice(item.currentItemPrice)}</p><p>{item.currentItemDiscount > 0 ? <p>Discount:{formatPrice(item.currentItemDiscount)}</p> : ''}</p></div></label>
                    ))}
                    </div>
                    <div class="PrintFile-totals">
                        <br />
                        <br />
                        <label> TOTAL AMOUNT: <p>{formatPrice(paymentData.total)}</p></label>
                        <label> PAYMENT: <p>{formatPrice(paymentData.payment)}</p></label>
                        <label> CHANGE: <p>{formatPrice(paymentData.change)}</p></label>
                        <label> DISCOUNT: <p> {formatPrice(paymentData.discount)}</p></label>
                        <label> TAX VAT: <p>₱ 0.00</p></label>
                    </div>
                </div>

                <hr />

                <div class="PrintFile-footer">
                    <label> Transaction ID: <p>{paymentData.transactionID}</p></label>
                    <label> Time/Date: <p>{paymentData.time} - {paymentData.date}</p></label>
                    <br />
                    <label> Mode of Payment: <p>{paymentData.modeOfPay}</p></label>
                    <label> Cashier: <p>{userData.name}</p></label>
                    <br />
                    <label> Customer: <p>{paymentData.customer}</p></label>
                    <br />
                    <h2> PETCO.CO {userData.branch} </h2>
                </div>
                </div>

            </div>
            <div class="ToPrint-footer">
            <button class="cancel" onClick={() => {closeModal(false);   window.location.reload(); }}>
                <span class="material-symbols-sharp"> arrow_back </span>
                BACK
                </button>
                <button class="save" onClick={saveAndPrint}>
                <span class="material-symbols-sharp"> print </span>
                PRINT
                </button>
            </div>
            </div>
        </div>
    )
}

export default ToPrint_Modal