import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.png';
import './EmailOTP.css';
import { useNavigate } from 'react-router-dom';


const RESEND_INTERVAL = 20;

const EmailOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [resendTimer, setResendTimer] = useState(RESEND_INTERVAL);
    const [showResentMessage, setShowResentMessage] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isResendDisabled && resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (resendTimer === 0) {
            setIsResendDisabled(false);
        }
    }, [resendTimer, isResendDisabled]);

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (index === otp.length - 1) {
            handleSubmit(); 
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('Text').slice(0, 4);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[newOtp.length - 1]?.focus();
        }
    };

    const handleResendOtp = () => {
        setIsResendDisabled(true);
        setResendTimer(RESEND_INTERVAL);
        setShowResentMessage(true);

        setTimeout(() => {
            setShowResentMessage(false);
        }, 2000);

        //OTP resend logic 
        console.log("OTP Resent");
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        console.log("OTP Submitted: ", otp.join(''));
        //OTP submission logic 
        navigate('/landing'); 
    };

    return (
        <div className="otp-container">
            <div className="otp-left">
                <button className="back-button">
                    <span className="back-icon">←</span> Back
                </button>
                <h1>OTP Verification</h1>
                <p className="otp-instruction">
                    We’ve sent you the verification code on your registered e-mail
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="otp-inputs" onPaste={handlePaste}>
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                autoComplete="off"
                                inputMode="numeric"
                                aria-label={`OTP digit ${index + 1}`}
                                pattern="[0-9]*"
                            />
                        ))}
                    </div>
                    <button type="submit" className="continue-button">Continue</button>
                </form>
                <div className="resend-section">
                    {showResentMessage && (
                        <p className="resent-message" role="alert">Code resent!</p>
                    )}
                    <p>Didn’t receive OTP yet?</p>
                    <button
                        className="resend-button"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                    >
                        {isResendDisabled
                            ? `Re-send code in 0:${resendTimer < 10 ? `0${resendTimer}` : resendTimer}`
                            : 'Resend OTP'}
                    </button>
                </div>
            </div>
            <div className="right-box">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
        </div>
    );
};

export default EmailOTP;
