import './reportGraph.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function ReportGraph_Analytics({userData}) {

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year + "-" + monthA + "-" + dayA);

    const [countFood, setcountFood] = useState();
    
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Food');
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
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
        data.append('date', dateToday);
        data.append('branch', userData.branch);

        axios.post(localStorage.getItem('urlLink')+'Analytics_getItemSoldByCategory.php', data)
            .then(response => {
                setcountOthers(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const none = countFood + countSupplies + countTools + countGrooming + countMedicine + countTreatment + countExamination + countOthers
        
    const chartData = [
        { title: 'FOOD: '+countFood, value: countFood, color: 'brown' },
        { title: 'SUPPLIES: '+countSupplies, value: countSupplies, color: 'yellow' },
        { title: 'TOOLS: '+countTools, value: countTools, color: 'gray' },
        { title: 'GROOMING: '+countGrooming, value: countGrooming, color: 'navy' },
        { title: 'MEDICINE: '+countMedicine, value: countMedicine, color: 'orange' },
        { title: 'TREATMENT: '+countTreatment, value: countTreatment, color: 'blue' },
        { title: 'EXAMINATION: '+countExamination, value: countExamination, color: 'red' },
        { title: 'OTHERS: '+countOthers, value: countOthers, color: 'green' },
        { title: '', value: 0, color: 'black' },]

    return (
        <div class="reportGraph-container">
            <h4>ITEM SOLD COUTN GRAPH: BY TYPE </h4>
        <div class="reportGraphPanel">
            <div class="reportGraph-graph">
            <PieChart viewBoxSize={[120,100]} data={chartData}/>
            </div>
            <div class="reportGraph-content">
                {countFood > 0 ?
                <label>
                    <span class="food" style={{ background:'brown'}}/>
                    <p> FOOD - {countFood} </p>
                </label>
                : ''}
                {countSupplies > 0 ?
                <label>
                    <span class="food" style={{ background:'yellow'}}/>
                    <p> SUPPLIES - {countSupplies} </p>
                </label>
                : ''}
                {countTools > 0 ?
                <label>
                    <span class="food" style={{ background:'gray'}}/>
                    <p> TOOLS - {countTools} </p>
                </label>
                : ''}
                {countGrooming > 0 ?
                <label>
                    <span class="food" style={{ background:'navy'}}/>
                    <p> GROOMING - {countGrooming} </p>
                </label>
                : ''}
                {countMedicine > 0 ?
                <label>
                    <span class="food" style={{ background:'orange'}}/>
                    <p> MEDICINE - {countMedicine} </p>
                </label>
                : ''}
                {countTreatment > 0 ?
                <label>
                    <span class="food" style={{ background:'blue'}}/>
                    <p> TREATMENT - {countTreatment} </p>
                </label>
                : ''}
                {countExamination > 0 ?
                <label>
                    <span class="food" style={{ background:'red'}}/>
                    <p> EXAMINATION - {countExamination} </p>
                </label>
                : ''}
                {countOthers > 0 ?
                <label>
                    <span class="food" style={{ background:'green'}}/>
                    <p> OTHERS - {countOthers} </p>
                </label>
                : ''}
            </div>

        </div>
        </div>
    )
}

export default ReportGraph_Analytics;