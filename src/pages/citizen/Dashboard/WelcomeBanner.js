// WelcomeBanner.js

import React, { useEffect } from 'react';
import './WelcomeBanner.css'; // Import CSS for styling the welcome banner

const WelcomeBanner = () => {
    useEffect(() => {
        var first = document.querySelector('.first');
        var second = document.querySelector('.second');
        var third = document.querySelector('.third');

        setTimeout(() => {
            first.classList.remove('show');
            second.classList.add('show');
        }, 2000);
        setTimeout(() => {
            second.classList.remove('show');
            third.classList.add('show');
        }, 4000);
    }, []);

    const closeBanner = () => {
        const ads = document.querySelector('.ads');
        if (ads) {
            ads.classList.add('d-none');
        }
    };

    return (
        <div className="ads">
            <div className="frame first show">
                Welcome Sarah! 
                <button id="close" onClick={closeBanner}>X</button>
            </div>
            <div className="frame second">
                Your legal queries are just a click away.
            </div>
            <div className="frame third">
                Start exploring Lejit AI!
            </div>
        </div>
    );
};

export default WelcomeBanner;
