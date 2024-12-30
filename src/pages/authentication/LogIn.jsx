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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
       setErrorMessage("Invalid email format.");
       return;
    }

    try {
       const response = await fetch("backend/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
       });

       const data = await response.json();

       if (!response.ok) {
          if (response.status === 401) {
             setErrorMessage("Invalid email or password.");
          } else {
             setErrorMessage(data.message || "Login failed. Please try again.");
          }
       } else {
          localStorage.setItem("token", data.token);
          setErrorMessage("");

          // Redirect based on role
          if (data.role === "law_firm") {
             navigate("/landing");
          } else if (data.role === "citizen") {
             navigate("/lawyers");
          } else {
             navigate("/landing");
          }
       }
    } catch (error) {
       console.error("Login error:", error);
       setErrorMessage("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-box">
        <h1 className="login-title">Sign In to your Account</h1>
        <p className="welcome-back">Welcome back!</p>

        <div className="login-input-fields">
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
              aria-label={passwordVisible ? "Hide password" : "Show password"}
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
          <a href="/reset-password" className="forgot-password">Forgot Password?</a>
        </div>

        {errorMessage && (
          <div className="error-message">
            <AiFillWarning className="error-icon" />
            {errorMessage}
          </div>
        )}

        <button className="sign-in-button" onClick={handleSignIn}>SIGN IN</button>

        <div className="logindivider">OR</div>

        <button className="google-login">
          <img src={GoogleLogo} alt="Google Logo" className="social-icon" />
          Login with Google
        </button>
        <button className="facebook-login">
          <img src={FacebookLogo} alt="Facebook Logo" className="social-icon" />
          Login with Facebook
        </button>

        <p className="sign-up-text">
          Don’t have an account? <a href="/lawfirmsignup">Sign Up</a>
        </p>
      </div>

      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>
    </div>
  );
};

export default LogIn;
