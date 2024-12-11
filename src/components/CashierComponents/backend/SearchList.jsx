import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchList_Cashier({userData, inputSearch}){
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  };
  //Backend
  const [data, setData] = useState([]);

  useEffect(() => {
      const data = new FormData();
      data.append('search', inputSearch);
      data.append('branch', userData.branch);

      axios.post(localStorage.getItem('urlLink')+'searchCashier.php', data)
          .then(response => {
              setData(response.data);
          })
          .catch(error => {
              alertr('There was an error!', error);
          });
  }, []);
    
    const addItem = (itemID, name, price, quantity, type, sold) => {
      const toInt = parseInt(sold);
      const data = new FormData();
      data.append('itemID', itemID);
      data.append('branch', userData.branch);
      data.append('currentItemName', name);
      data.append('defaultPrice', price);
      data.append('currentItemPrice', price);
      data.append('currentItemQuantity', 1);
      data.append('itemQuantity', quantity-1);
      data.append('currentItemDiscount', 0);
      data.append('currentItemType', type);
      data.append('itemSold', toInt+1);
      
      axios.post(localStorage.getItem('urlLink')+'updateCurrentList.php', data)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log('Input Error');
      });
      window.location.reload();
  };
  
      return(
          <div>
           <h1 style={{ padding: '.5rem', color: 'gray'}}> SEARCH FIND: {inputSearch}</h1>
           <hr style={{width: '58rem', marginLeft: '1rem'}}/>
          {data.length > 0? (
            <div className="productList-items-list">

            {data.map((item, index) => (
              <div className="productItem" key={index} style={{backgroundImage: 'url(' +item.itemImage + ')', backgroundSize: 'cover'}}>
              <div className="productItem-header">
              <label> ID{item.itemID}</label>
              </div>
              <div className="productItem-content">
                <label> {item.itemName} </label>
                <label> {formatPrice(item.itemPrice)}</label>
              </div>
              <div className="productItem-footer">
                
              {item.itemType === 'Grooming' || item.itemType === 'Treatment' || item.itemType === 'Examination'?
                ('') : (<p> Q: {item.itemQuantity}</p>)}
              {item.itemType === 'Grooming' || item.itemType === 'Treatment' || item.itemType === 'Examination'?
                (<p> SOLD: {item.itemSold} </p>) : (<p> S: {item.itemSold}</p>)}
                  
              </div>
              <button onClick={() => addItem (item.itemID, item.itemName, item.itemPrice, item.itemQuantity,item.itemType, item.itemSold)}>
                <p> ADD <i className='bx bx-add-to-queue'></i></p>
                <label> {item.itemName}</label>
                <label> {formatPrice(item.itemPrice)}</label>
              </button>
            </div>
            ))}
            </div>
            ): (<div class="cashier-empty"> <label>NO RESULT</label> <p>- SEARCH: {inputSearch} -</p>  </div>)}
          </div>
      )
  }
export default SearchList_Cashier