import React, { useState } from 'react';
import { ReactComponent as AppleIcon } from '../assets/apple-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook-icon.svg';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const API_BASE_URL = 'http://localhost:8000'; // TODO: Adjust this to Django server url

const LoginPage = () => {
  const [userType, setUserType] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Load SDKs here (same as before)
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/`, {
        email,
        password,
      });

      if (response.data.token) {
        alert("Login Successful. ~dev");
        localStorage.setItem("authToken", response.data.token);
        navigate("/law-firm"); // Redirect to dashboard
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  const handleSocialLogin = async (provider) => {
    // Social login logic here (same as before)
  };

  // Functions to navigate to Citizen Dashboard and Law Firm Dashboard
  const handleCitizenDashboardClick = () => {
    navigate('/citizen/cdashboard'); // Redirect to the dashboard page for citizens
  };

  const handleLawFirmDashboardClick = () => {
    navigate('/law-firm'); // Redirect to the dashboard page for law firms
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-2">Legal Tech</h1>
        <h2 className="text-lg text-center mb-6">Welcome to Legal Tech Login</h2>

        <div className="flex p-0.5 mb-6 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
          <button
            className={`flex-1 py-2 px-4 text-center ${userType === 'citizen' ? 'bg-white rounded-md' : 'bg-gray-100 text-gray-400'}`}
            onClick={() => setUserType('citizen')}
          >
            Citizen
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${userType === 'lawFirm' ? 'bg-white rounded-md' : 'bg-gray-100 text-gray-400'}`}
            onClick={() => setUserType('lawFirm')}
          >
            Law Firm
          </button>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">Email/Username</label>
            <input
              type="text"
              className="w-full p-3 px-4 rounded-md bg-[#EAECEC]"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 px-4 rounded-md pr-10 bg-[#EAECEC]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 text-white py-2 px-4 rounded-md hover:bg-sky-500 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center my-4">OR</div>

        <div className="space-y-3">
          <button onClick={() => handleSocialLogin('apple')} className="w-full flex items-center border border-gray-300 rounded py-2 px-4 hover:bg-gray-50">
            <AppleIcon className="h-5 w-5 ml-2" />
            <span className="flex-grow text-center">Login with Apple</span>
          </button>
          <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center border border-gray-300 rounded py-2 px-4 hover:bg-gray-50">
            <GoogleIcon className="h-5 w-5 ml-2" />
            <span className="flex-grow text-center">Login with Google</span>
          </button>
          <button onClick={() => handleSocialLogin('facebook')} className="w-full flex items-center border border-gray-300 rounded py-2 px-4 hover:bg-gray-50">
            <FacebookIcon className="h-5 w-5 ml-2" />
            <span className="flex-grow text-center">Login with Facebook</span>
          </button>
        </div>

        {/* Add Citizen and Law Firm Dashboard Buttons */}
        <div className="space-y-3 mt-6">
          <button
            onClick={handleCitizenDashboardClick}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Citizen Dashboard
          </button>
          <button
            onClick={handleLawFirmDashboardClick}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Law Firm Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
