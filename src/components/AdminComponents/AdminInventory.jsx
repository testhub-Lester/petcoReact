import './AdminInventory.css'
import React, { useEffect, useState } from 'react';
import ItemList from './AdminInventory/inventoryItemList'
import QuantityStatus from './AdminInventory/quantityStatus'
import ItemUpdates from './AdminInventory/itemUpdates';

function AdminInventory_Panel({userData}){
    const [key , setKey] = useState(0)
    const [pickedBranch, setpickedBranch] = useState(userData.branch == 'All' ? 'San Jose' : userData.branch)

    const handleSelecChangeA =(event)=>{
        setpickedBranch(event.target.value)
        setKey(key + 1)
    }

    const [openQuantity, setQuantity] = useState(true)
    const [openUpdates, setUpdates] = useState(false)

    const toggleQuantity = () => {
        setUpdates(false)
        setQuantity(true)
    }

    const toggleUpdates = () => {
        setQuantity(false)
        setUpdates(true)
    }

    return (
        <div class="adminInventory-panel">
            <div class="adminInventory-leftside">
            <div class="adminInventorySettings">
                <label> {userData.branch == 'All' || userData.role == 'Admin' ? '' : "BRANCH: " + userData.branch}</label>
                {userData.branch == 'All' || userData.role == 'Admin' ?
                    <select id="itemSelectCategory" value={pickedBranch} onChange={handleSelecChangeA}>
                        <option value="Manggahan"> MANGGAHAN </option>
                        <option value="Parada"> PARADA </option>
                        <option value="San Jose"> SAN JOSE</option>
                    </select>
                :
                ''}
                
            </div>

            <div class="adminInventory-lists" key={key}>
                <div class="adminInventory-lists-header">
                    <button value={openQuantity} onClick={toggleQuantity}> QUANTITY STATUS </button>
                    <button value={openUpdates} onClick={toggleUpdates}> ITEM UPDATES ALL </button>
                </div>
                <hr />

                {openQuantity &&
                (<QuantityStatus branch={pickedBranch}/>)}

                {openUpdates &&
                (<ItemUpdates branch={pickedBranch}/>)}

            </div>

            </div>
            <div class="adminInventory-rightside" key={key}>
                <ItemList branch={pickedBranch} userData={userData}/>
            </div>
        </div>
    )
}

export default AdminInventory_Panel