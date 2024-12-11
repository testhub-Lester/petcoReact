import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ProductListPanel from '../productList'

function ListCount_Cashier({userData}){
    const [listCount, setlistCount] = useState([]);
    //Backend
    const [dataAll, setDataAll] = useState([]);
    const [dataFood, setDataFood] = useState([]);
    const [dataSupplies, setDataSupplies] = useState([]);
    const [dataTools, setDataTools] = useState([]);
    const [dataGrooming, setDataGrooming] = useState([]);
    const [dataMedicine, setDataMedicine] = useState([]);
    const [dataTreatment, setDataTreatment] = useState([]);
    const [dataExamination, setDataExamination] = useState([]);
    const [dataOthers, setDataOthers] = useState([]);

    useEffect(() => { //ALL
        const formData = new FormData();
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'', formData)
            .then(response => {
                setDataFood(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Food');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataFood(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Supplies');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataSupplies(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Tools');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataTools(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Grooming');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataGrooming(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Medicine');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataMedicine(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Treatment');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataTreatment(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Examination');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataExamination(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        const formData = new FormData();
        formData.append('itemType', 'Others');
        formData.append('itemBranch', userData.branch);
    
        axios.post(localStorage.getItem('urlLink')+'getListCount.php', formData)
            .then(response => {
                setDataOthers(response.data);
            })
            .catch(error => {
                alert.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        setlistCount({
            FoodCount:dataFood.length,
            SuppliesCount:dataSupplies.length,
            ToolsCount:dataTools.length,
            GroomingCount:dataGrooming.length,
            MedicineCount:dataMedicine.length,
            TreatmentCount:dataTreatment.length,
            ExaminationCount:dataExamination.length,
            OthersCount:dataOthers.length
        });
    });
    
    return(
        <div>
            <ProductListPanel userData={userData} listCount={listCount}/>
        </div>
    )
}
export default ListCount_Cashier