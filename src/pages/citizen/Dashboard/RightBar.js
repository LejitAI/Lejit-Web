// RightBar.js

import React from 'react';
import './RightBar.css'; // Importing the CSS for RightBar
import RecentUpdates from './RecentUpdates'; // Importing the RecentUpdates component

const RightBar = () => {
    return (
        <div className="right-bar">
            {/* Other components can go here */}
            <RecentUpdates />
            {/* You can add more components here later */}
        </div>
    );
};

export default RightBar;
