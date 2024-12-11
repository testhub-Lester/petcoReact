import './inventoryItemList.css'
import React, { useEffect, useState } from 'react';
import Header_Inventory from './header-inventory';
import AddModal from './modalAddItem'
import DeleteModal from './modalDeleteItem'
import EditModal from './modalEditItem'

import AllList from './backend/AllList'
import FoodList from './backend/FoodList'
import SuppliesList from './backend/SuppliesList'
import ToolsList from './backend/ToolsList'
import GroomingList from './backend/GroomingList'
import MedicineList from './backend/MedicineList'
import TreatmentList from './backend/TreatmentList'
import ExaminationList from './backend/ExaminationList'
import OthersList from './backend/OthersList'
import LowQuantity from './backend/LowQuantity'

function ItemList_Inventory({userData}) {
    const [openEditModal, setEditModal] = useState(false)
    const [openAddModal, setAddModal] = useState(false)
    const [openDelModal, setDelModal] = useState(false)
    
    const [showOption, setOption] = useState(false)

    const toggleOption= () => {
        setOption(!showOption)
    }

    const [category, setCategory] = useState('')

    const [openAllList, setAllList] = useState(true)
    const [openFoodList, setFoodList] = useState(false)
    const [openSuppliesList, setSuppliesList] = useState(false)
    const [openToolsList, setToolsList] = useState(false)
    const [openGroomingList, setGroomingList] = useState(false)
    const [openMedicineList, setMedicineList] = useState(false)
    const [openTreatmentList, setTreatmentList] = useState(false)
    const [openExaminationList, setExaminationList] = useState(false)
    const [openOthersList, setOthersList] = useState(false)
    const [openLowQuantity, setLowQuantity] = useState(false)

    const toggleLowQuantity= () => {
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setMedicineList(false)
        setExaminationList(false)
        setOthersList(false)
        setAllList(false)
        setLowQuantity(true)
    }

    const toggleAllList= () => {
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setMedicineList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setAllList(true)
    }

    const toggleFoodList= () => {
        setAllList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setFoodList(true)
    }

    const toggleSuppliesList= () => {
        setAllList(false)
        setFoodList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setSuppliesList(true)
    }

    const toggleToolsList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setToolsList(true)
    }

    const toggleGroomingList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setGroomingList(true)
    }

    const toggleMedicineList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setOthersList(false)
        setLowQuantity(false)
        setMedicineList(true)
    }

    const toggleTreatmentList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setExaminationList(false)
        setTreatmentList(true)
        setLowQuantity(false)
        setOthersList(false)
    }

    const toggleExaminationList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setOthersList(false)
        setLowQuantity(false)
        setExaminationList(true)
    }

    const toggleOthersList= () => {
        setAllList(false)
        setFoodList(false)
        setSuppliesList(false)
        setToolsList(false)
        setGroomingList(false)
        setMedicineList(false)
        setTreatmentList(false)
        setExaminationList(false)
        setLowQuantity(false)
        setOthersList(true)
    }

    return (
        <div class="inventoryItemListPanel">
            <div class="item-category">
                <div class="item-categoryMain">
                <button value={openAllList} onClick={toggleAllList}> ALL </button>
                <button value={openFoodList} onClick={toggleFoodList}> FOOD </button>
                <button value={openSuppliesList} onClick={toggleSuppliesList}> SUPPLIES </button>
                <button value={openToolsList} onClick={toggleToolsList}> TOOLS </button>
                <button value={openGroomingList} onClick={toggleGroomingList}> GROOMING </button>
                <button value={openMedicineList} onClick={toggleMedicineList}> MEDICINE </button>
                <button value={openTreatmentList} onClick={toggleTreatmentList}> TREATMENT </button>
                <button value={openExaminationList} onClick={toggleExaminationList}> EXAMINATION </button>
                <button value={openOthersList} onClick={toggleOthersList}> OTHERS </button>
                </div>
                <div class="item-categoryOption">
                <button value={openLowQuantity} onClick={toggleLowQuantity}> LOW QUANTITY </button>
                <button value={''} class="optionButton" onClick={toggleOption}> OPTION </button>
                </div>
            </div>
            <div class="item-list-panel">
                { showOption && <div class="item-option-container">
                <div class="item-option">
                        <button onClick={() => {setAddModal(true);}}>
                        <i class='bx bx-plus'></i>
                        <p> ADD </p>
                        </button>
                </div>
                <div class="item-option">
                        <button class="delete" onClick={() => {setDelModal(true);}}>
                        <i class='bx bx-minus'></i>
                        <p> DELETE </p>
                        </button>
                </div>
                </div>
                }
                {openAllList ? <AllList userData={userData}/> : null}
                {openFoodList ? <FoodList userData={userData}/> : null}
                {openSuppliesList ? <SuppliesList userData={userData}/> : null}
                {openToolsList ? <ToolsList userData={userData}/> : null}
                {openGroomingList ? <GroomingList userData={userData}/> : null}
                {openMedicineList ? <MedicineList userData={userData}/> : null}
                {openTreatmentList ? <TreatmentList userData={userData}/> : null}
                {openExaminationList ? <ExaminationList userData={userData}/> : null}
                {openOthersList ? <OthersList userData={userData}/> : null}
                {openLowQuantity ? <LowQuantity userData={userData}/> : null}
            </div>
            {openEditModal && <EditModal closeModal={setEditModal} userData={userData}/>}
            {openAddModal && <AddModal closeAddModal={setAddModal} userData={userData} />}
            {openDelModal && <DeleteModal closeDelModal={setDelModal} userData={userData}/>}
        </div>
    )
}

export default ItemList_Inventory