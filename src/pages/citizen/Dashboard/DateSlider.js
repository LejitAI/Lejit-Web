import React, { useState } from 'react';
import './DateSlider.css'; // CSS for styling

const DateSlider = ({ caseDate }) => {
    const initialDates = [
        { date: '2024-09-01', day: 'MON', number: '01', month: 'SEP' },
        { date: '2024-09-02', day: 'TUE', number: '02', month: 'SEP' },
        { date: '2024-09-03', day: 'WED', number: '03', month: 'SEP' },
        { date: '2024-09-04', day: 'THU', number: '04', month: 'SEP' },
        { date: '2024-09-05', day: 'FRI', number: '05', month: 'SEP' },
        { date: '2024-09-06', day: 'SAT', number: '06', month: 'SEP' },
        { date: '2024-09-07', day: 'SUN', number: '07', month: 'SEP' },
        { date: '2024-09-08', day: 'MON', number: '08', month: 'SEP' },
        { date: '2024-09-09', day: 'TUE', number: '09', month: 'SEP' },
        { date: '2024-09-10', day: 'WED', number: '10', month: 'SEP' },
        { date: '2024-09-11', day: 'THU', number: '11', month: 'SEP' }, // your example date starts here
        { date: '2024-09-12', day: 'FRI', number: '12', month: 'SEP' },
        { date: '2024-09-13', day: 'SAT', number: '13', month: 'SEP' },
        { date: '2024-09-14', day: 'SUN', number: '14', month: 'SEP' },
        { date: '2024-09-15', day: 'MON', number: '15', month: 'SEP' },
        { date: '2024-09-16', day: 'TUE', number: '16', month: 'SEP' },
        { date: '2024-09-17', day: 'WED', number: '17', month: 'SEP' },
        { date: '2024-09-18', day: 'THU', number: '18', month: 'SEP' },
        { date: '2024-09-19', day: 'FRI', number: '19', month: 'SEP' },
        { date: '2024-09-20', day: 'SAT', number: '20', month: 'SEP' },
    ];

    const [currentIndex, setCurrentIndex] = useState(10); // Start with the first middle date (2024-09-11)

    const handleHover = (index) => {
        setCurrentIndex(index);
        const dateItem = document.getElementById(`date-${index}`);
        if (dateItem) {
            dateItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    };

    return (
        <div className="date-slider">
            <div className="date-container">
                {initialDates.map((item, index) => (
                    <span
                        id={`date-${index}`}
                        key={item.date}
                        className={`date-item ${item.date === caseDate ? 'highlight' : ''} ${index === currentIndex ? 'hovered' : ''}`}
                        onMouseEnter={() => handleHover(index)}
                    >
                        <span className="date-day">{item.day}</span>
                        <span className="date-number">{item.number}</span>
                        <span className="date-month">{item.month}</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DateSlider;
