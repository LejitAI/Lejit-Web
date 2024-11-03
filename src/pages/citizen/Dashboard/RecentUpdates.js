// RecentUpdates.js

import React from 'react';
import './RecentUpdates.css'; // Import the CSS for this component

const updates = [
    { id: 1, type: 'New case added', description: 'High Profile Criminal Case' },
    { id: 2, type: 'Upcoming Appointment', description: 'Appointment at 4:00 pm tomorrow' },
    { id: 3, type: 'Case Update', description: 'Congratulations for winning the case!' },
    { id: 4, type: 'New message', description: 'You have a new message from your lawyer.' },
];

const RecentUpdates = () => {
    return (
        <div className="raise-update-card">
            <div className="raise-update-header">
                <h2>Raise and Update</h2>
                <button className="view-all-button">View All</button>
            </div>
            <div className="updates-list">
                {updates.map(update => (
                    <div key={update.id} className="update-item">
                        <span className={`update-icon ${update.type === 'New case added' ? 'document-icon' : update.type === 'Upcoming Appointment' ? 'appointment-icon' : 'case-icon'}`}></span>
                        <div className="update-content">
                            <span className="update-type">{update.type}</span>
                            <span className="update-description">{update.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentUpdates;
