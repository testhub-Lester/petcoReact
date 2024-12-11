import './inventoryItemList.css'
import React, { useEffect, useState } from 'react';

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
import DeletedItems from './backend/DeletedItems'

function ItemList_Inventory({branch, userData}) {
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
    const [openDeleted, setDeleted] = useState(false)

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
        setDeleted(false)
        setLowQuantity(true)
    }

    const toggleDeleted= () => {
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
        setLowQuantity(false)
        setDeleted(true)
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
        setDeleted(false)
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
        setDeleted(false)
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
        setDeleted(false)
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
        setDeleted(false)
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
        setDeleted(false)
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
        setDeleted(false)
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
        setLowQuantity(false)
        setDeleted(false)
        setOthersList(false)
        setTreatmentList(true)
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
        setDeleted(false)
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
        setDeleted(false)
        setOthersList(true)
    }

    return (
        <div class="inventoryItemListPanel">
            <div class="admin-item-category">
                <div class="admin-item-categoryMain">
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
                <div class="admin-item-categoryOption">
                <button value={openLowQuantity} onClick={toggleLowQuantity}>
                    LOW
                </button>
                <button value={openDeleted} onClick={toggleDeleted}>
                    DELETED
                </button>
                </div>
            </div>
            <div class="item-list-panel">
                {openAllList ? <AllList branch={branch} userData={userData} /> : null}
                {openFoodList ? <FoodList branch={branch} userData={userData}/> : null}
                {openSuppliesList ? <SuppliesList branch={branch} userData={userData}/> : null}
                {openToolsList ? <ToolsList branch={branch} userData={userData}/> : null}
                {openGroomingList ? <GroomingList branch={branch} userData={userData}/> : null}
                {openMedicineList ? <MedicineList branch={branch} userData={userData}/> : null}
                {openTreatmentList ? <TreatmentList branch={branch} userData={userData}/> : null}
                {openExaminationList ? <ExaminationList branch={branch} userData={userData}/> : null}
                {openOthersList ? <OthersList branch={branch} userData={userData}/> : null}
                {openLowQuantity ? <LowQuantity branch={branch} userData={userData}/> : null}
                {openDeleted ? <DeletedItems branch={branch} userData={userData}/> : null}
            </div>
        </div>
    )
}

export default ItemList_Inventory