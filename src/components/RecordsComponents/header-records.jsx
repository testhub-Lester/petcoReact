import './header-records.css'
import React, { useEffect, useState } from 'react';

function Header_Records() {
    const [monthName, setMonthName] = useState('');

    useEffect(() => {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const currentMonth = new Date().getMonth();
      setMonthName(monthNames[currentMonth]);
    }, []);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dayA = day < 10 ? `0${day}` : day;
    const monthA = month < 10 ? `0${month}` : month;
    const dateToday = (year + "-" + monthA + "-" + dayA);


    return (
        <div class="headerRecordsPanel">
            <h1> RECORDS </h1>
            <label> {monthName} - {dayA} - {year} </label>
        </div>
    )
}

export default Header_Records;