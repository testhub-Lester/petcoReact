import './reportGraphA.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function ReportGraph_Analytics({branch, date}) {

    const [countFood, setcountFood] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Food');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountFood(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countSupplies, setcountSupplies] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Supplies');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountSupplies(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countTools, setcountTools] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Tools');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountTools(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countGrooming, setcountGrooming] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Grooming');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountGrooming(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countMedicine, setcountMedicine] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Medicine');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountMedicine(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countTreatment, setcountTreatment] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Treatment');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountTreatment(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countExamination, setcountExamination] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Examination');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountExamination(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countOthers, setcountOthers] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Others');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSoldByCategory.php', data)
            .then(response => {
                setcountOthers(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const chartData = [
        { title: 'GROOMING: '+countGrooming, value: countGrooming, color: 'pink' },
        { title: 'TREATMENT: '+countTreatment, value: countTreatment, color: 'blue' },
        { title: 'EXAMINATION: '+countExamination, value: countExamination, color: 'red' },
        { title: 'OTHERS: '+countOthers, value: countOthers, color: 'green' },]

    return (
        <div class="reportGraph-admin-containerA">

        <div class="admin-reportGraphPanelA">
        <h5> SERVICES: AVAILED COUNT</h5>
            <div class="admin-reportGraph-graph">
            <PieChart viewBoxSize={[100,100]} data={chartData} style={{backgroundColor: 'white', borderRadius: '100rem', height: '15rem' , boxShadow: '0 2rem 3rem rgba(0, 0, 0, 0.2)', marginTop: '1rem'}}/>
            </div>
            <div class="admin-reportGraph-content">

                <label>
                    <span class="food" style={{ background:'pink'}}/>
                    <p> GROOMING - {countGrooming} </p>
                </label>

                <label>
                    <span class="food" style={{ background:'blue'}}/>
                    <p> TREATMENT - {countTreatment} </p>
                </label>

                <label>
                    <span class="food" style={{ background:'red'}}/>
                    <p> EXAMINATION - {countExamination} </p>
                </label>

                <label>
                    <span class="food" style={{ background:'green'}}/>
                    <p> OTHERS - {countOthers} </p>
                </label>

            </div>

        </div>
        </div>
    )
}

export default ReportGraph_Analytics;