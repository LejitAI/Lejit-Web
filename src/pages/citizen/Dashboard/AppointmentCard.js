import React from 'react';
import './AppointmentCard.css'; // CSS for styling
import DateSlider from './DateSlider'; // Import DateSlider

const AppointmentCard = () => {
    const caseDate = '2024-09-12'; // Example case date for highlighting

    // Dummy data for appointments
    const appointments = [
        { name: 'John Doe', caseType: 'Family Dispute Case', time: '2:00 pm - 4:00 pm', imageUrl: "/Avatar.png" }, // Added imageUrl
        { name: 'Jane Smith', caseType: 'Property Settlement', time: '1:00 pm - 3:00 pm', imageUrl: "/Avatar.png" }, // Added imageUrl
        { name: 'Alice Johnson', caseType: 'Custody Battle', time: '3:00 pm - 5:00 pm', imageUrl: "/Avatar.png" }, // Added imageUrl
        { name: 'Bob Brown', caseType: 'Divorce Case', time: '11:00 am - 1:00 pm', imageUrl: "/Avatar.png" } // Added imageUrl
    ];

    return (
        <div className="appointment-card">
            <div className="appointment-header">
                <h2 className="appointment-title">Lawyer Appointment</h2>
                <span className="view-all">View All</span>
            </div>
            <div className="appointment-calendar">
                <DateSlider caseDate={caseDate} />
            </div>
            <div className="appointment-list">
                {appointments.map((appointment, index) => (
                    <div key={index} className="appointment-person">
                        <div className="appointment-info">
                            <img 
                                src={appointment.imageUrl} 
                                alt={appointment.name} 
                                className="lawyer-photo" 
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%',  // Circular image
                                    marginRight: '10px' 
                                }} 
                            />
                            <div>
                                <p className="person-name">{appointment.name}</p>
                                <p className="case-type">{appointment.caseType}</p>
                            </div>
                            <div className="icons">
                                <span className="message-icon">📩</span>
                                <span className="phone-icon">📞</span>
                            </div>
                        </div>
                        <p className="appointment-scheduled">Appointment Scheduled: {appointment.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentCard;
