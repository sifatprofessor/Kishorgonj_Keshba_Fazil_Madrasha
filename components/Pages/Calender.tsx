import React from 'react';
import Calendar from 'react-calendar';
import '../Styles/Calender.css';

export function CustomCalendar() {

    const value = new Date();



    return (
        <div className="calendar-container">
            <Calendar
                value={value}
                className="dark-calendar shadow-lg"
                locale="en-US"
            />
        </div>
    );
}
