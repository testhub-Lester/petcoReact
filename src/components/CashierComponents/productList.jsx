import './productList.css';
import './backend/productItem.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import SearchList from './backend/SearchList'
import AllList from './backend/AllList'
import FoodList from './backend/FoodList'
import SuppliesList from './backend/SuppliesList'
import ToolsList from './backend/ToolsList'
import GroomingList from './backend/GroomingList'
import MedicineList from './backend/MedicineList'
import TreatmentList from './backend/TreatmentList'
import ExaminationList from './backend/ExaminationList'
import OthersList from './backend/OthersList'

function ProductList_Cashier({userData, listCount}) {

  const [openSearchList, setSearchList] = useState(false)
  const [openAllList, setAllList] = useState(true)
  const [openFoodList, setFoodList] = useState(false)
  const [openSuppliesList, setSuppliesList] = useState(false)
  const [openToolsList, setToolsList] = useState(false)
  const [openGroomingList, setGroomingList] = useState(false)
  const [openMedicineList, setMedicineList] = useState(false)
  const [openTreatmentList, setTreatmentList] = useState(false)
  const [openExaminationList, setExaminationList] = useState(false)
  const [openOthersList, setOthersList] = useState(false)

  const [inputSearchData, setinputSearchData] = useState()
  const [key, setKey] = useState(0);

  const inputOnchange = () => {
    const selectElement = document.getElementById('inputSearch');
    const selectedValue = selectElement.value;
    setinputSearchData(selectedValue)
    console.log(inputSearchData)
  }

  const toggleSearchList= () => {
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setMedicineList(false)
    setOthersList(false)
    setSearchList(true)
    setKey(prevKey => prevKey + 1);
}

  const toggleAllList= () => {
    setSearchList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setMedicineList(false)
    setExaminationList(false)
    setOthersList(false)
    setAllList(true)
}

const toggleFoodList= () => {
    setSearchList(false)
    setAllList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(false)
    setFoodList(true)
}

const toggleSuppliesList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(false)
    setSuppliesList(true)
}

const toggleToolsList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(false)
    setToolsList(true)
}

const toggleGroomingList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(false)
    setGroomingList(true)
}

const toggleMedicineList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(false)
    setMedicineList(true)
}

const toggleTreatmentList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setExaminationList(false)
    setTreatmentList(true)
    setOthersList(false)
}

const toggleExaminationList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(true)
    setOthersList(false)
}

const toggleOthersList= () => {
  setSearchList(false)
    setAllList(false)
    setFoodList(false)
    setSuppliesList(false)
    setToolsList(false)
    setGroomingList(false)
    setMedicineList(false)
    setTreatmentList(false)
    setExaminationList(false)
    setOthersList(true)
}

  return (
    <div className="productListPanel">
      <div className="productList-header">
        <div className="productList-searchBar">
          <button type="submit" onClick={toggleSearchList}> SEARCH </button>
          <input type="text" id="inputSearch" onChange={inputOnchange}/>
        </div>
      </div>
      <div className="productList-content">
        <div className="productList-category">
          <div className="productList-category-content">
            <div className="quickFilter-cashier">
              <h3> QUICK FILTER: </h3>
              <hr />
              <button value={openAllList} onClick={toggleAllList}> <li>ALL</li> </button>
              <button> <li>RECENT ITEMS</li></button>
              <hr />
              <button value={openFoodList} onClick={toggleFoodList}> FOOD <p>{listCount.FoodCount > 0 ? listCount.FoodCount : '0' }</p> </button>
              <button value={openSuppliesList} onClick={toggleSuppliesList}> SUPPLIES <p>{listCount.SuppliesCount > 0 ? listCount.SuppliesCount : '0' }</p></button>
              <button value={openToolsList} onClick={toggleToolsList}> TOOLS <p>{listCount.ToolsCount > 0 ? listCount.ToolsCount : '0' }</p></button>
              <button value={openGroomingList} onClick={toggleGroomingList}> GROOMING <p>{listCount.GroomingCount > 0 ? listCount.GroomingCount : '0' }</p></button>
              <button value={openMedicineList} onClick={toggleMedicineList}> MEDICINE <p>{listCount.MedicineCount > 0 ? listCount.MedicineCount : '0' }</p></button>
              <button value={openTreatmentList} onClick={toggleTreatmentList}> TREATMENT <p>{listCount.TreatmentCount > 0 ? listCount.TreatmentCount : '0' }</p></button>
              <button value={openExaminationList} onClick={toggleExaminationList}> EXAMINATION <p>{listCount.ExaminationCount > 0 ? listCount.ExaminationCount : '0' }</p></button>
              <button value={openOthersList} onClick={toggleOthersList}> OTHERS <p>{listCount.OthersCount > 0 ? listCount.OthersCount : '0' }</p></button>
            </div>
          </div>
        </div>

        <div className="productList-items">
                {openSearchList ? <div key={key}> <SearchList userData={userData} inputSearch={inputSearchData}/> </div>: null}
                {openAllList ? <AllList userData={userData} /> : null}
                {openFoodList ? <FoodList userData={userData} /> : null}
                {openSuppliesList ? <SuppliesList userData={userData} /> : null}
                {openToolsList ? <ToolsList userData={userData} /> : null}
                {openGroomingList ? <GroomingList userData={userData} />  : null}
                {openMedicineList ? <MedicineList userData={userData} />  : null}
                {openTreatmentList ? <TreatmentList userData={userData} />  : null}
                {openExaminationList ? <ExaminationList userData={userData} /> : null}
                {openOthersList ? <OthersList userData={userData} />  : null}
        </div>

      </div>
    </div>
  );
}

export default ProductList_Cashier;
