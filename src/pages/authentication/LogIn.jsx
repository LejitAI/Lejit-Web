import React, { useState } from "react";
import "./LogIn.css";
import GoogleLogo from '../assets/google.svg'; 
import FacebookLogo from '../assets/facebook.svg';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillWarning } from 'react-icons/ai'; 

const LogIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate(); 

  const handleSignIn = async () => {
    if (!email || !password) {
       setErrorMessage("Email and password are required.");
       return;
    }
 
    try {
       const response = await fetch("https://lejit-backend-node.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
       });
 
       const data = await response.json();
 
       if (!response.ok) {
          setErrorMessage(data.message || "Invalid email or password.");
       } else {
          localStorage.setItem("token", data.token);
 
          setErrorMessage("");
          navigate("/lawfirmsignup"); 
       }
    } catch (error) {
       setErrorMessage("Server error. Please try again later.");
    }
 };
 

  return (
    <div className="login-container">
      <div className="left-box">
        <h1 className="login-title">Sign In to your Account</h1>
        <p className="welcome-back">Welcome back!</p>

        <div className="input-fields">
          <div className="input-container">
            <input 
              type="email" 
              placeholder="Email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password" 
              className="input-field" 
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
        </div>

        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="/" className="forgot-password">Forgot Password?</a>
        </div>

        {errorMessage && (
          <div className="error-message">
            <AiFillWarning className="error-icon" />
            {errorMessage}
          </div>
        )}

        <button className="sign-in-button" onClick={handleSignIn}>SIGN IN</button>

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
          Don’t have an account? <a href="/">Sign Up</a>
        </p>
      </div>

      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>
    </div>
  );
};

export default LogIn;
