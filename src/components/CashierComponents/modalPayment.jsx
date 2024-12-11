import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './modalPayment.css'
import PrintModal from './modalToPrint'
import DiscountModal from './modalDiscount'

function ModalPayment_Cashier({userData}) {
    const navigate = useNavigate();
    const check =()=>{
        if(userData.role == 'Admin') {
            navigate('/Admin')
        }
    }

    useEffect(() => {
        check()
      }, []);

    const [key, setKey] = useState(0);
    const [openPrintModal, setPrintModal] = useState(false);

    const [inputPayment, setInputPayment] = useState(0);
    const [totalChange, setTotalChange] = useState(0);
    const [discountValue, setdiscountValue] = useState(0);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };

    const [paymentData, setPaymentData] = useState([])

    const inputPaymentMath = () => {
        const selectElement = document.getElementById('paymentInput');
        const selectedValue = selectElement.value;
        const selectElementSelect = document.getElementById('modeOfPay');
        const selectedValueSelect = selectElementSelect.value;
        const selectElementCustomer = document.getElementById('customerInput');
        const selectedValueCustomer = selectElementCustomer.value;
        setInputPayment(selectedValue)
        const pay = parseFloat(inputPayment)
        const total = parseFloat(totalAmount)
        setTotalChange(pay - total)
        setPaymentData(
            {total: totalAmount,
            payment:inputPayment,
            change:totalChange,
            customer: selectedValueCustomer,
            transactionID:transactionID+ "" + num1 + "" +num2,
            time:timeToday,
            date:dateToday,
            discount:totalDiscount,
            modeOfPay:selectedValueSelect});
    }

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

    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const transactionID = "TRID" + hour +""+ minutes + "-" + dayA + month + "" ;


    const [openDiscountModal, setDiscountModal] = useState(false)
    const [discountItem, setdiscountItem] = useState('')

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
        

        const [totalAmount, setTotalAmount] = useState(0);

        useEffect(() => {
            const data = new FormData();
            data.append('branch', userData.branch);
            axios.post(localStorage.getItem('urlLink')+'totalAmount.php', data)
              .then(response => {
                setTotalAmount(response.data.totalAmount);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
          }, []);

          const [totalDiscount, setTotalDiscount] = useState(0);

          useEffect(() => {
              const data = new FormData();
              data.append('branch', userData.branch);
              axios.post(localStorage.getItem('urlLink')+'totalDiscount.php', data)
                .then(response => {
                  setTotalDiscount(response.data.totalAmount);
                })
                .catch(error => {
                  console.error('Error fetching data:', error);
                });
            }, []);

    const AddQuantity = (itemID ,name, dPrice,price, quantity, dQuantity,discount, sold) => {
        const toInt = parseInt(sold);
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);
        formData.append('currentItemName', name);
        formData.append('defaultPrice', dPrice);
        formData.append('currentItemPrice', price);
        formData.append('currentItemQuantity', quantity);
        formData.append('itemQuantity', dQuantity-1);
        formData.append('currentItemDiscount', discount);
        formData.append('itemSold', toInt+1);

        axios.post(localStorage.getItem('urlLink')+'addQuantityPayment.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
    }
    const MinusQuantity = (itemID ,name, dPrice,price, quantity, dQuantity,discount, sold) => {
        const toIntA = parseInt(dQuantity);
        const toInt = parseInt(sold);
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);
        formData.append('currentItemName', name);
        formData.append('defaultPrice', dPrice);
        formData.append('currentItemPrice', price);
        formData.append('currentItemQuantity', quantity);
        formData.append('itemQuantity', toIntA+1);
        formData.append('currentItemDiscount', discount);
        formData.append('itemSold', toInt-1);

        axios.post(localStorage.getItem('urlLink')+'minusQuantityPayment.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
    }

    const removeItem = (itemID) => {
        const formData = new FormData();
        formData.append('itemID', itemID);
        formData.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'deleteCurrentItemCashier.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        window.location.reload()
        closeAddModal(false)
    };

      const saveTransaction = () => {
        const formData = new FormData();
        formData.append('transactionID', paymentData.transactionID);
        formData.append('branch', userData.branch);
        formData.append('cashier', userData.role);
        formData.append('totalAmount', paymentData.total);
        formData.append('payment', paymentData.payment);
        formData.append('change', paymentData.change);
        formData.append('taxVat', 0);
        formData.append('discount', 0);
        formData.append('modeOfPayment', 'Cash');
        formData.append('time', paymentData.time);
        formData.append('date', paymentData.date);
    
        axios.post(localStorage.getItem('urlLink')+'insertRecords.php', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log('There was an error!', error);
            });
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


    const ArchiveTransaction = () => {
        if (inputPayment == null || inputPayment > 0) {
            alert('INPUT PAYMENT AMOUNT')
        }
        else if (inputPayment < totalAmount)
        {
            alert('INPUT PAYMENT IS INSUFFICIENT')
        }
        else {
            saveRecordItem();
            saveTransaction();
            removeAllItems();
            alert('ARCHIVING TRANSACTION')
            setSeconds(0)
            navigate(-1)
        }
    }

    const ToPrint = () => {
        if (inputPayment == null || inputPayment == 0) {
            alert('INPUT PAYMENT AMOUNT')
        }
        else if (inputPayment < totalAmount)
        {
            alert('INPUT PAYMENT IS INSUFFICIENT')
        }
        else {
            setSeconds(0)
            setPrintModal(true)
        }
    }

    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds + 1), 100);
          return () => {
            clearTimeout(timer);
            inputPaymentMath()
          };
        }
    }, [seconds]);

    const [idList, setidList] = useState([]);
    const getID=()=>{
        const data = new FormData();
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'decreaseGetID.php', data)
            .then(response => {
                setidList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
     });
    }
    const [quantityList, setquantityList] = useState([]);
    const getQuantity=()=>{
        const data = new FormData();
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'decreaseGetQuantity.php', data)
            .then(response => {
                setquantityList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const updateQuantity = () => {
        axios.post(localStorage.getItem('urlLink')+'decreaseQuantity.php', {
            idList,quantityList
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error updating the quantity!', error);
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div class="modalPayment-container">
            <div class="modalPayment-panel">
            <div class="modalPayment-header">
                <h1> PAYMENT TAB</h1>
                <div class="modalPayment-header-side">
                <button onClick={() => {setSeconds(0); navigate(-1)}}>
                    <span class="material-symbols-sharp"> arrow_back_ios </span>
                    BACK
                </button>

                </div>
            </div>

            <div class="modalPayment-content">

            <div class="modalPayment-printView">
            {data.length > 0? (<div>
                <div class="view-itemList">

        <table>
        <thead>
                <th> ITEM NAME </th>
                <th> PRICE </th>
                <th> QUANTITY </th>
                <th> OPTIONS</th>
        </thead>
        {data.map((item, index) => (
        <tbody>
        <td>
            <div class="table-itemName">
            ID{item.itemID} - {item.currentItemName}
            </div>
        </td>
        <td>{formatPrice(item.currentItemPrice)}{item.currentItemDiscount > 0 ? <p id='discount'> DISCOUNT {formatPrice(item.currentItemDiscount)}</p> : ''} </td>
        <td>
            <div class="table-options">

            <button onClick={()=> {MinusQuantity(item.itemID, item.currentItemName, item.defaultPrice, item.currentItemPrice, item.currentItemQuantity, item.itemQuantity, item.currentItemDiscount, item.itemSold)}}>-</button>

            <label> {item.currentItemQuantity}</label>

            <button onClick={()=> {AddQuantity(item.itemID, item.currentItemName, item.defaultPrice, item.currentItemPrice, item.currentItemQuantity, item.itemQuantity, item.currentItemDiscount, item.itemSold);         setKey(prevKey => prevKey + 1);}}>+</button>
            </div>
        </td>
        <td>
            <div class="table-options" style={{ width: '5rem'}}>
            <button onClick={() => {setDiscountModal(true); setdiscountItem(item.itemID)}}>DISCOUNT</button>
            <button onClick={()=> {removeItem(item.itemID)}}>REMOVE ITEM</button>
            </div>
        </td>

        </tbody>
        
        ))}
                {openDiscountModal && <DiscountModal closeModal={setDiscountModal}  userData={userData} itemID={discountItem} itemName={''}/>}

        </table>
                </div>
                </div> ): (<div class="currentItemList-empty"> EMPTY </div>)}

            </div>

            <div class="modalPayment-info">
                
                <div class="payment-transaction-info">

                    <div class="payment-total-amount">
                    <h3> TOTAL AMOUNT: </h3>
                    <h1> {formatPrice(totalAmount)}</h1>
                    </div>

                    <div class="payment-tags">
                    <label> <h5>TAX VAT: </h5> <h5>₱[0000.00]</h5></label>
                    <label> <h5>DISCOUNT: </h5> <h5>{formatPrice(totalDiscount)}</h5></label>
                    <hr />
                    <p> CASHIER: {userData.role} </p>
                    <p> TRANSACTION ID: {transactionID}XX </p>
                    </div>

                    <br />

                    <div class="transactionOtherInfo">
                    <div class="payment-timeAndDate">
                        <p> TIME: {timeToday} </p>
                        <p> DATE: {dateToday} </p>
                    </div>
                    </div>

                </div>


                <div class="payment-input">
  
                    <div class="payment-amount">
                        <label> PAYMENT: </label>
                        <input type="number" id='paymentInput' placeholder='00.00' required/>
                        <select name="modePayment" id="modeOfPay">
                            <option value="Cash"> CASH </option>
                            <option value="GCash"> GCASH </option>
                            <option value="Paymaya"> PAYMAYA </option>
                            <option value="Bank"> BANK </option>
                        </select>
                    </div>

                    <div class="payment-change">
                    <label> CHANGE: </label>
                    <p>{totalChange}</p>
                    </div>

                    <hr />
                    <div class="payment-customer">
                    <label style={{ padding: '.5rem'}}> CUSTOMER: </label>
                    <input type="text" id='customerInput' placeholder='Customer Name Here'
                    style={{ padding: '.5rem'}}
                    required/>
                </div>
                
                </div>
            </div>

            </div>
            <hr />
            <div class="modalPayment-footer">
                <button class="save" onClick={ToPrint}>
                PROCEED
                </button>
            </div>

            {openPrintModal && <PrintModal closeModal={setPrintModal} userData={userData} paymentData={paymentData}/>}
            </div>
        </div>
    )
}

export default ModalPayment_Cashier;