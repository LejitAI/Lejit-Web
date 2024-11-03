import React, { useState } from 'react';
import './MyCases.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../Header/Header'; // Adjust the import path as necessary
import Sidebar from '../Sidebar/Sidebar'; // Adjust the import path as necessary

const MyCases = () => {
    const [isTaskBoardVisible, setIsTaskBoardVisible] = useState(true);
    const [date, setDate] = useState(new Date());

    // Sample Task Data
    const tasks = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        caseName: `Case ${index + 1}`,
        lawyerName: `Lawyer ${index + 1}`,
        duration: `${Math.floor(Math.random() * 30) + 1} days`,
        status: index % 2 === 0 ? 'In Progress' : 'Completed',
        image: 'https://via.placeholder.com/50', // Placeholder image
    }));

    const toggleView = () => {
        setIsTaskBoardVisible(!isTaskBoardVisible);
    };

    return (
        <div className="my-cases">
            <Header />
            <div className="content">
                <Sidebar />
                <div className="main-content">
                    <div className="toggle-button">
                        <button onClick={toggleView}>
                            {isTaskBoardVisible ? 'Switch to Calendar' : 'Switch to Task Board'}
                        </button>
                    </div>
                    {isTaskBoardVisible ? (
                        <div className="task-board">
                            <h2>Task Board</h2>
                            <table className="task-table">
                                <thead>
                                    <tr>
                                        <th>Lawyer</th>
                                        <th>Case Name</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id}>
                                            <td>
                                                <img src={task.image} alt={`Lawyer ${task.lawyerName}`} className="lawyer-image" />
                                                {task.lawyerName}
                                            </td>
                                            <td>{task.caseName}</td>
                                            <td>{task.duration}</td>
                                            <td>{task.status}</td>
                                            <td className="contact-icon">
                                                <img src="https://via.placeholder.com/20" alt="Contact Icon" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="calendar">
                            <h2>Calendar</h2>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="react-calendar"
                            />
                            <p className="selected-date">Selected Date: {date.toDateString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyCases;
