import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Styles/Calender.css'; // You will need to create this CSS file to style the calendar

export function CustomCalendar() {
    const [value, setValue] = useState<Date>(new Date());

    return (
        <div className="calendar-container">
            <Calendar
                value={value}
                // onChange={(value: Date | Date[], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setValue(value as Date)}
                className="dark-calendar"
                locale="en-US"
            />
        </div>
    );
}
