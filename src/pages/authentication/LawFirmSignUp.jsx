import React, { useState } from "react";
import "./LawFirmSignUp.css";
import GoogleLogo from '../assets/google.svg'; 
import FacebookLogo from '../assets/facebook.svg';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { AiFillWarning } from 'react-icons/ai'; 

const LawFirmSignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const [lawFirmName, setLawFirmName] = useState(""); 
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    if (!lawFirmName || !fullName || !email || !password || !confirmPassword) {
        setErrorMessage("All fields are required.");
        return;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setErrorMessage("Invalid email format.");
        return;
    }
 
    if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters.");
        return;
    }
 
    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match."); 
        return; 
    }
 
    setErrorMessage("");
    setIsLoading(true); 
 
    try {
        const response = await fetch('http://13.232.153.48:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                law_firm: lawFirmName,
                username: fullName,
                email: email,
                password: password
            }),
        });
 
        const data = await response.json();
        if (response.ok) {
            navigate('/otp'); 
        } else {
            setErrorMessage(data.message || 'Failed to create account');
        }
    } catch (error) {
        setErrorMessage('Server error. Please try again later.');
    } finally {
        setIsLoading(false);
    }
 };
 

  return (
    <div className="signup-container">
      <div className="left-box">
        <h1 className="signup-title">Let's create your Account</h1>
        <p className="welcome-back">Get started with us!</p>

        <div className="signup-input-fields">
          <div className="signup-input-container">
            <input 
              type="text" 
              placeholder="Law Firm Name" 
              className="signup-input-field" 
              value={lawFirmName}
              onChange={(e) => setLawFirmName(e.target.value)}
            />
          </div>
          <div className="signup-input-container">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="signup-input-field" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="signup-input-container">
            <input 
              type="email" 
              placeholder="Email" 
              className="signup-input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-input-container">
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Your password" 
              className="signup-input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className="signup-input-container">
            <input 
              type={confirmPasswordVisible ? "text" : "password"} 
              placeholder="Confirm password" 
              className="signup-input-field" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="error-message">
            <AiFillWarning className="error-icon" /> 
            {errorMessage}
          </div>
        )}

        <button 
          className="sign-up-button" 
          onClick={handleSignUp}
          disabled={isLoading} 
        >
          {isLoading ? "Creating Account..." : "LET'S GET STARTED"}
        </button>

        <div className="divider">OR</div>

        <button className="google-login">
          <img src={GoogleLogo} alt="Google Logo" className="social-icon" />
          Login with Google
        </button>
        <button className="facebook-login">
          <img src={FacebookLogo} alt="Facebook Logo" className="social-icon" />
          Login with Facebook
        </button>

        <p className="sign-up-text">
          Already have an account?{" "}
          <span 
            className="sign-in-link" 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>
      </div>

      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>
    </div>
  );
};

export default LawFirmSignUp;
