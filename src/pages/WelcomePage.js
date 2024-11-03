import React from 'react';
import './WelcomePage.css';
import logo from './lejit-logo-removebg-preview.png';

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="left-section">
                <h1>Welcome to Lejit</h1>
                <p>Your trusted legal companion!</p>
                <div className="options">
                    <div className="option">Explore Lawyers by Category</div>
                    <div className="option">Find Nearby Legal Experts</div>
                    <div className="option">Seamless Appointments</div>
                    <div className="option">Prepare Case Documents</div>
                </div>
                <div className="user-selection">
                    <label>
                        <input type="radio" name="userType" value="Citizen" />
                        <span>Citizen</span>
                    </label>
                    <label>
                        <input type="radio" name="userType" value="Lawyer" />
                        <span>Lawyer</span>
                    </label>
                </div>
                <button className="get-started">LET'S GET STARTED</button>
                <p className="sign-in">
                    Already have an account? <a href="/login">Sign In Here</a>
                </p>
            </div>
            <div className="right-section">
                <img src={logo} alt="Lejit Logo" className="logo" />
            </div>
        </div>
    );
}

export default Welcome;
