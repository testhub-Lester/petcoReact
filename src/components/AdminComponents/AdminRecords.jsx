import './AdminRecords.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import RecordList from './AdminRecords/recordList'

import RecordListWeek from './AdminRecords/ByWeek/recordList'

import RecordListMonth from './AdminRecords/ByMonth/recordList'

import RecordListSearch from './AdminRecords/SearchList/recordList'

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
    const [search, setSearch] = useState(false)
    const [today, setToday] = useState(true)
    const [ByWeek, setByWeek] = useState(false)
    const [ByMonth, setByMonth] = useState(false)

    const [inputSearch, setinputSearch] = useState()

    const toggleSearch =()=> {
        setToday(false)
        setByMonth(false)
        setByWeek(false)
        setKey(key+1);
        setSearch(true)
    }

    const toggleToday =()=> {
        setSearch(false)
        setByWeek(false)
        setByMonth(false)
        setToday(true)
        setpickedDate(dateToday);
        setKey(key+1);
    }

    const toggleByWeek =()=> {
        setSearch(false)
        setToday(false)
        setByMonth(false)
        setByWeek(true)
    }

    const toggleByMonth =()=> {
        setSearch(false)
        setToday(false)
        setByWeek(false)
        setByMonth(true)
    }


    const getinputSearch = () => {
        const selectElement = document.getElementById('inputSearch');
        const selectedValue = selectElement.value;
        setinputSearch(selectedValue)
        console.log(inputSearch)
      }

    return(
        <div class="main-recordsAdmin">
                <div class="topSide-recordsAdmin">
                    <div class="recordsAdminSettings">
                        <label> OPTIONS </label>
                        {hideBranchButton ? 
                        <select id="itemSelectCategory" value={pickedBranch} onChange={handleSelecChangeA}>
                            <option value="Manggahan"> MANGGAHAN </option>
                            <option value="Parada"> PARADA </option>
                            <option value="San Jose"> SAN JOSE</option>
                        </select>
                        :
                        <button > {userData.branch} </button>}
                        <div class="recordsAdminSettings-search">
                        <button onClick={toggleSearch}> SEARCH</button>
                        <input id="inputSearch" onChange={getinputSearch}/>
                        </div>
                        <label style={{fontSize: '1rem', marginTop: '1rem'}}> SELECT DATE </label>
                        <input type='date' value={pickedDate} onChange={(e) => {toggleToday(); setpickedDate(e.target.value); setKey(key+1)}}/>
                        <hr />


                        <button value={today} onClick={() => {toggleToday()}}> TODAY </button>
                        <button value={ByWeek} onClick={() => {toggleByWeek()}}> BY WEEK </button>
                        <button value={ByMonth} onClick={() => {toggleByMonth()}}> BY MONTH </button>
                    </div>


                    <div key={key} style={{display: 'flex', gap: '1rem'}}>
                        
                        {search &&
                        <RecordListSearch userData={userData} branch={pickedBranch} date={pickedDate} search={inputSearch} />}

                        {today &&
                        <RecordList userData={userData} branch={pickedBranch} date={pickedDate}/>}
                        
                        {ByWeek &&
                        <RecordListWeek userData={userData} branch={pickedBranch} date={pickedDate}/>}
                        
                        {ByMonth &&
                        <RecordListMonth userData={userData} branch={pickedBranch} date={pickedDate}/>}

                    </div>
                </div>
        </div>
    )
}

export default Analytics_Page