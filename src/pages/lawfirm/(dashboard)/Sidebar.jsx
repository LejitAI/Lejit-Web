import React from 'react';
import './Sidebar.css'; // Assuming you have some CSS for styling

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Sidebar Title</h2>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <a href="#home">Home</a>
                </li>
                <li className="sidebar-item">
                    <a href="#services">Services</a>
                </li>
                <li className="sidebar-item">
                    <a href="#clients">Clients</a>
                </li>
                <li className="sidebar-item">
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;