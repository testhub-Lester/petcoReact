import './AdminAnalytics.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ReportAnalysis from './AdminAnalytics/reportAnalysis'
import ReportGraph from './AdminAnalytics/reportGraph'
import ReportGraphA from './AdminAnalytics/reportGraphA'
import TransactionList from './AdminAnalytics/transactionList'

import ReportAnalysisWeek from './AdminAnalytics/ByWeek/reportAnalysis'
import ReportGraphWeek from './AdminAnalytics/ByWeek/reportGraph'
import ReportGraphAWeek from './AdminAnalytics/ByWeek/reportGraphA'
import TransactionListWeek from './AdminAnalytics/ByWeek/transactionList'

import ReportAnalysisMonth from './AdminAnalytics/ByMonth/reportAnalysis'
import ReportGraphMonth from './AdminAnalytics/ByMonth/reportGraph'
import ReportGraphAMonth from './AdminAnalytics/ByMonth/reportGraphA'
import TransactionListMonth from './AdminAnalytics/ByMonth/transactionList'

function Analytics_Page({userData}){
    const [key , setKey] = useState(0)

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year + "-" + monthA + "-" + dayA);

    const [hideBranchButton, sethideBranchButton] = useState(false)

    useEffect(() => {
        if (userData.role == 'Admin') {
            sethideBranchButton(true)
        }
    }, []);

    const [pickedDate, setpickedDate] = useState(dateToday)
    const [pickedBranch, setpickedBranch] = useState(userData.branch == 'All' ? 'San Jose' : userData.branch)

    const handleSelecChangeA =(event)=>{
        setpickedBranch(event.target.value)
        setKey(key + 1)
    }

    const [today, setToday] = useState(true)
    const [ByWeek, setByWeek] = useState(false)
    const [ByMonth, setByMonth] = useState(false)

    const toggleToday =()=> {
        setByWeek(false)
        setByMonth(false)
        setToday(true)
        setpickedDate(dateToday);
        setKey(key+1);
    }

    const toggleByWeek =()=> {
        setToday(false)
        setByMonth(false)
        setByWeek(true)
    }

    const toggleByMonth =()=> {
        setToday(false)
        setByWeek(false)
        setByMonth(true)
    }

    return(
        <div class="main-analyticsAdmin">
                <div class="topSide-analyticsAdmin">
                    <div class="analyticsAdminSettings">
                        <label> OPTIONS </label>
                        {hideBranchButton ? 
                        <select id="itemSelectCategory" value={pickedBranch} onChange={handleSelecChangeA}>
                            <option value="Manggahan"> MANGGAHAN </option>
                            <option value="Parada"> PARADA </option>
                            <option value="San Jose"> SAN JOSE</option>
                        </select>
                        :
                        <button > {userData.branch} </button>}
                        <label style={{fontSize: '1rem', marginTop: '1rem'}}> SELECT DATE </label>
                        <input type='date' value={pickedDate} onChange={(e) => {toggleToday(); setpickedDate(e.target.value); setKey(key+1);}}/>
                        <hr />
                        <button value={today} onClick={() => {toggleToday()}}> TODAY </button>
                        <button value={ByWeek} onClick={() => {toggleByWeek()}}> BY WEEK </button>
                        <button value={ByMonth} onClick={() => {toggleByMonth()}}> BY MONTH </button>
                    </div>

                    <div key={key}>
                    {today &&
                    <div style={{display: 'flex', gap: '1rem'}}>
                    <div class="admin-analytics-report">

                    <ReportAnalysis branch={pickedBranch} date={pickedDate} />
                    <div class="admin-analytics-graph" style={{ display: 'flex', gap: '1rem'}}>
                    <ReportGraph branch={pickedBranch} date={pickedDate}/>
                    <ReportGraphA branch={pickedBranch} date={pickedDate}/>
                    </div>

                    </div>
                    <TransactionList branch={pickedBranch} date={pickedDate}/>
                    </div>}

                    {ByWeek &&
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div class="admin-analytics-report">
                            <ReportAnalysisWeek branch={pickedBranch} date={pickedDate} />
                            <div class="admin-analytics-graph" style={{ display: 'flex', gap: '1rem'}}>
                                <ReportGraphWeek branch={pickedBranch} date={pickedDate}/>
                                <ReportGraphAWeek branch={pickedBranch} date={pickedDate}/>
                            </div>
                        </div>

                        <TransactionListWeek branch={pickedBranch} date={pickedDate}/>
                        </div>
                    }
                    
                    {ByMonth &&
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div class="admin-analytics-report">
                            <ReportAnalysisMonth branch={pickedBranch} date={pickedDate} />
                            <div class="admin-analytics-graph" style={{ display: 'flex', gap: '1rem'}}>
                                <ReportGraphMonth branch={pickedBranch} date={pickedDate}/>
                                <ReportGraphAMonth branch={pickedBranch} date={pickedDate}/>
                            </div>
                        </div>
                        <TransactionListMonth branch={pickedBranch} date={pickedDate}/>
                        </div>
                    }
                    </div>


                </div>
        </div>
    )
}

export default Analytics_Page