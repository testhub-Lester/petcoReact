import './reportAnalysis.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts'

function ReportAnalysis_Analytics({branch}) {

    const [monthName, setMonthName] = useState('');

    useEffect(() => {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const currentMonth = new Date().getMonth();
      setMonthName(monthNames[currentMonth]);
    }, []);

    const [grossIncome, setgrossIncome] = useState(0);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(value);
      };
    

    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_grossIncomeWeek.php', data)
            .then(response => {
                setgrossIncome(formatPrice(response.data.totalAmount));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [dataTransactionCount, setDataTransactionCount] = useState(0);
    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCount.php', data)
            .then(response => {
                setDataTransactionCount(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [dataItemSold, setDataItemSold] = useState(0);
    useEffect(() => {
        const data = new FormData();
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getItemSold.php', data)
            .then(response => {
                setDataItemSold(response.data.totalAmount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [countFood, setcountFood] = useState();
    useEffect(() => {
        const data = new FormData();
        data.append('itemType', 'Food');
        data.append('branch', branch);

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountFood(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountSupplies(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountTools(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountGrooming(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountMedicine(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountTreatment(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountExamination(response.data.length);
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

        axios.post(localStorage.getItem('urlLink')+'AnalyticsWeek_getTransactionCountByCategory.php', data)
            .then(response => {
                setcountOthers(response.data.length);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    
    const data = [
        { "name": "FOOD", "TRANSACTION": countFood },
        { "name": "SUPPLIES", "TRANSACTION": countSupplies },
        { "name": "TOOLS", "TRANSACTION": countTools },
        { "name": "GROOMING", "TRANSACTION": countGrooming },
        { "name": "MEDICINE", "TRANSACTION": countMedicine },
        { "name": "TREATMENT", "TRANSACTION": countTreatment },
        { "name": "EXAMINATION", "TRANSACTION": countExamination },
        { "name": "OTHERS", "TRANSACTION": countOthers }, ]

    return (
        <div class="reportAnalysisPanel-admin">
            <div class="reportAnalysis-admin-topContent">
            <div class="admin-leftContent-info">
                <div class="admin-leftContent-info-middle">
                <div class="admin-leftContent-info-top">
                    <label> {branch} </label>
                    <label> {monthName}</label>
                </div>
                    <label>
                        <h1> {grossIncome}</h1>
                        <p> Total Gross Income: </p>
                    </label>
                    <label>
                        <h2> {dataTransactionCount.length > 0 ? dataTransactionCount.length : '0'} </h2>
                        <p> Transactions Count: </p>
                    </label>
                    <label>
                        <h2> {dataItemSold} </h2>
                        <p> Items Sold Count </p>
                    </label>
                </div>
            </div>

            <div class="admin-rightContent-stats">
                    <div class="admin-rightContent-header">
                        <button> TRANSACTION COUNT CHART: BY TYPE </button>
                    </div>
                    
                    <BarChart width={850} height={350} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="TRANSACTION" fill="gray" />
                        </BarChart>
                </div>
            </div>
        </div>
    )
}

export default ReportAnalysis_Analytics;