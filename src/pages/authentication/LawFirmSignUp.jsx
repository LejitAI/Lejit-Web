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
        setErrorMessage("Password must be at least 8 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
    }

    setErrorMessage("");
    setIsLoading(true);

    // Clear any existing authentication data
    localStorage.clear();

    // Create user payload
    const userPayload = {
        role: 'law_firm',
        law_firm_name: lawFirmName,
        username: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };

    try {
        // Register the law firm user
        const response = await fetch('backend/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload),
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store authentication data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Create team member entry for the law firm owner
            const teamMemberPayload = {
                personalDetails: {
                    name: fullName,
                    email: email,
                    mobile: '',
                    gender: '',
                    yearsOfExperience: 0,
                    address: {
                        line1: '',
                        line2: '',
                        city: '',
                        state: '',
                        country: '',
                        postalCode: '',
                    }
                },
                professionalDetails: {
                    lawyerType: 'Owner',
                    governmentID: '',
                    degreeType: '',
                    degreeInstitution: '',
                    specialization: '',
                },
                bankAccountDetails: {
                    paymentMethod: 'Card',
                    cardDetails: {
                        cardNumber: '',
                        expirationDate: '',
                        cvv: '',
                        saveCard: false,
                    },
                    bankDetails: {
                        accountNumber: '',
                        bankName: '',
                        ifscCode: '',
                    },
                    upiId: '',
                },
                password: password, // Same password as the user account
            };

            // Create law firm details
            const lawFirmPayload = {
                lawFirmDetails: {
                    lawFirmName: lawFirmName,
                    operatingSince: new Date().getFullYear().toString(), // Current year
                    yearsOfExperience: '0',
                    specialization: '',
                    contactInfo: {
                        email: email,
                        mobile: '',
                        address: {
                            line1: '',
                            line2: '',
                            city: '',
                            state: '',
                            postalCode: '',
                        }
                    }
                },
                professionalDetails: {
                    lawyerType: 'Law Firm',
                    caseDetails: {
                        caseSolvedCount: 0,
                        caseBasedBillRate: '',
                        timeBasedBillRate: '',
                        previousCases: []
                    }
                },
                bankAccountDetails: {
                    paymentMethod: 'Card',
                    cardDetails: {
                        cardNumber: '',
                        expirationDate: '',
                        cvv: '',
                        saveCard: false
                    },
                    bankDetails: {
                        accountNumber: '',
                        bankName: '',
                        ifscCode: ''
                    },
                    upiId: ''
                }
            };

            // Create team member entry
            const teamMemberResponse = await fetch('backend/api/admin/add-team-member', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                },
                body: JSON.stringify(teamMemberPayload),
            });

            // Create law firm details entry
            const lawFirmResponse = await fetch('backend/api/admin/add-law-firm-details', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                },
                body: JSON.stringify(lawFirmPayload),
            });

            if (!teamMemberResponse.ok) {
                console.error('Failed to create team member entry');
            }

            if (!lawFirmResponse.ok) {
                console.error('Failed to create law firm details');
            }

            navigate('/ldashboard');
        } else {
            setErrorMessage(data.message || 'Failed to create account.');
        }
    } catch (error) {
        console.error('Signup error:', error);
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
          {/* Law Firm Name */}
          <div className="signup-input-container">
            <input 
              type="text" 
              placeholder="Law Firm Name" 
              className="signup-input-field" 
              value={lawFirmName}
              onChange={(e) => setLawFirmName(e.target.value)}
            />
          </div>

          {/* Full Name */}
          <div className="signup-input-container">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="signup-input-field" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="signup-input-container">
            <input 
              type="email" 
              placeholder="Email" 
              className="signup-input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
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

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            <AiFillWarning className="error-icon" />
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button 
          className="sign-up-button" 
          onClick={handleSignUp}
          disabled={isLoading} 
        >
          {isLoading ? "Creating Account..." : "LET'S GET STARTED"}
        </button>

        <div className="divider">OR</div>

        {/* Social Logins */}
        <button className="google-login">
          <img src={GoogleLogo} alt="Google Logo" className="social-icon" />
          Login with Google
        </button>
        <button className="facebook-login">
          <img src={FacebookLogo} alt="Facebook Logo" className="social-icon" />
          Login with Facebook
        </button>

        {/* Sign-In Option */}
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

      {/* Right Box */}
      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>
    </div>
  );
};

export default LawFirmSignUp;