import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaTachometerAlt, FaFileAlt, FaCalendarAlt, FaRegClipboard, FaUserFriends, FaUser, FaWallet, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Lejit</h2>
            <nav className="sidebar-nav">
                <NavLink to="/citizen/cdashboard" className="nav-link" activeClassName="active">
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                </NavLink>
                <NavLink to="/citizen/mycases" className="nav-link" activeClassName="active">
                    <FaRegClipboard className="nav-icon" />
                    My Cases
                </NavLink>
                <NavLink to="/citizen/appointments" className="nav-link" activeClassName="active">
                    <FaCalendarAlt className="nav-icon" />
                    Appointments
                </NavLink>
                <NavLink to="/legal-templates" className="nav-link" activeClassName="active">
                    <FaFileAlt className="nav-icon" />
                    Legal Templates
                </NavLink>
                <NavLink to="/nearby-lawyers" className="nav-link" activeClassName="active">
                    <FaUserFriends className="nav-icon" />
                    Nearby Lawyers
                </NavLink>
                <NavLink to="/my-lawyers" className="nav-link" activeClassName="active">
                    <FaUser className="nav-icon" />
                    My Lawyers
                </NavLink>
                <NavLink to="/case-invite" className="nav-link" activeClassName="active">
                    <FaSignOutAlt className="nav-icon" />
                    Case Invite
                </NavLink>
                <NavLink to="/wallet-shop" className="nav-link" activeClassName="active">
                    <FaWallet className="nav-icon" />
                    Knowledge Hub
                </NavLink>
                <NavLink to="/settings" className="nav-link" activeClassName="active">
                    <FaCog className="nav-icon" />
                    Settings
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
