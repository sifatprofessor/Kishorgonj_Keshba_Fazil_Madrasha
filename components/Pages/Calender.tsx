import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Styles/Calender.css'; // You will need to create this CSS file to style the calendar

export function CustomCalendar() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, setValue] = useState<Date>(new Date());



    return (
        <div className="calendar-container">
            <Calendar
                value={value}
                className="dark-calendar"
                locale="en-US"
            />
        </div>
    );
}
