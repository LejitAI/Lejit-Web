import React from "react";
import "./LogIn.css";
import GoogleLogo from '../assets/google.svg'; 
import FacebookLogo from '../assets/facebook.svg';
import Logo from '../assets/logo.png';

const LogIn = () => {
  return (
    <div className="login-container">
      {/* Left Box */}
      <div className="left-box">
        <h1 className="login-title">Sign In to your Account</h1>
        <p className="welcome-back">Welcome back!</p>

        {/* Input Fields */}
        <div className="input-fields">
          <div className="input-container">
            <input type="email" placeholder="Email" className="input-field" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" className="input-field" />
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="/" className="forgot-password">Forgot Password?</a>
        </div>

        {/* Sign In Button */}
        <button className="sign-in-button">SIGN IN</button>

        {/* OR Divider */}
        <div className="divider">OR</div>

        {/* Social Login Buttons */}
        <button className="google-login">
          <img src={GoogleLogo} alt="Google Logo" className="social-icon" />
          Login with Google
        </button>
        <button className="facebook-login">
          <img src={FacebookLogo} alt="Facebook Logo" className="social-icon" />
          Login with Facebook
        </button>

        {/* Sign Up Link */}
        <p className="sign-up-text">
          Don’t have an account? <a href="/">Sign Up</a>
        </p>
      </div>

      {/* Right Box */}
      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>

    </div>
  );
};

export default LogIn;
