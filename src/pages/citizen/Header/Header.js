import React, { useEffect } from 'react';
import './Header.css'; // Import your CSS file for styling
import $ from 'jquery'; // Import jQuery

const Header = () => {

    useEffect(() => {
        // jQuery functionality for search bar focus
        $("#custom-search").click(function() {
            $(".search-query").focus();
        });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <header className="header-container">
            {/* Left Section - Logo and Search Bar */}
            <div className="header-left">
                <div className="logo-container">
                    <div className="logo">
                        <img src="/lejit-logo.jpg" alt="Lejit Logo" />
                    </div>
                </div>
                <div className="menu-icon">
                    &#9776; {/* This is the three-line icon */}
                </div>
                <div id="custom-search">
                    <input type="text" className="search-query" placeholder="Search" />
                    <button type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>

            {/* Right Section - Notifications, Language, User Info */}
            <div className="header-right">
                <div className="notification-icon">
                    <img src="/notification.png" alt="Notifications" />
                </div>
                <div className="language-picker">
                    <img src="/images.png" alt="Language" />
                    <span className="language-text">English</span>
                    <span className="dropdown-arrow">&#9660;</span> {/* Downward arrow */}
                </div>
                <div className="user-info">
                    <img src="/Avatar.png" alt="User Profile" />
                    <span className="username">Hi Sarah!</span>
                    <span className="dropdown-arrow">&#9660;</span> {/* Downward arrow */}
                </div>
            </div>
        </header>
    );
};

export default Header;
