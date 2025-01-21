import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Button, Typography } from '@mui/material';
import { ColorModeContext, useMode } from '../../../theme';
import Topbar from '../../citizen/global/Topbar';
import Sidebar from '../../citizen/global/Sidebar';
import './BookAppointment.css';

const BookAppointment = () => {
  const [theme, colorMode] = useMode();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [gender, setGender] = useState('Female');
  const [formData, setFormData] = useState({
    fullName: 'Taylor Brown',
    age: '26 - 30',
    caseNotes: 'Lorem ipsum dolor sit amet...',
  });

  // Generate dates dynamically
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const newDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
          day: date.toLocaleString('default', { weekday: 'short' }).toUpperCase(),
          date: date.getDate(),
        };
      });
      setDates(newDates);
      setSelectedDate(newDates[0]); // Set the first date as default
    };

    generateDates();
  }, []);

  // Generate time slots dynamically
  useEffect(() => {
    const generateTimeSlots = () => {
      const startTime = 10; // Start time (10 AM)
      const endTime = 18; // End time (6 PM)
      const slots = [];
      for (let hour = startTime; hour <= endTime; hour++) {
        const time = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
        slots.push(time);
      }
      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  const handleDateClick = (date) => setSelectedDate(date);
  const handleTimeClick = (time) => setSelectedTime(time);
  const handleGenderSelect = (selectedGender) => setGender(selectedGender);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your appointment.");
      return;
    }
  
    try {
      // API call to book appointment
      const response = await fetch("http://backend.lejit.ai/backend/api/admin/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          clientId: "client-id-from-state-or-context",
          appointmentDate: `${new Date().getFullYear()}-${selectedDate.date}`,
          appointmentTime: selectedTime,
          gender,
          caseNotes: formData.caseNotes,
        }),
      });
  
      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to book appointment: ${error.message}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <Box display="flex" height="100vh" position="relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          overflow="auto"
          sx={{
            backgroundColor: '#f7f8fa',
            padding: 2,
          }}
        >
          {/* Topbar */}
          <Topbar />

          {/* Content Area */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              background: '#fff',
              borderRadius: '12px',
              padding: 4,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '1200px',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <div className="book-appointment">
              <div className="header">
                <Button
                  variant="text"
                  onClick={() => window.history.back()}
                  style={{ color: '#0F67FD' }}
                >
                  {'< Back'}
                </Button>
                <Typography variant="h4" className="title" textAlign="center">
                  Book Appointment
                </Typography>
              </div>

              {/* Date Selector */}
              <div className="dates-container">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    className={`date-card ${
                      selectedDate && selectedDate.date === date.date ? 'selected' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <span className="day">{date.day}</span>
                    <span className="date">{date.date}</span>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="time-container">
                <Typography variant="h6" className="section-title">
                  Available Time
                </Typography>
                <div className="time-slots">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="details-container">
                <Typography variant="h6" className="section-title">
                  Personal Details
                </Typography>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <div className="gender-buttons">
                    <button
                      className={`gender-button ${gender === 'Male' ? 'selected' : ''}`}
                      onClick={() => handleGenderSelect('Male')}
                    >
                      Male
                    </button>
                    <button
                      className={`gender-button ${gender === 'Female' ? 'selected' : ''}`}
                      onClick={() => handleGenderSelect('Female')}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Write/Edit Your Case Notes</label>
                  <textarea
                    name="caseNotes"
                    value={formData.caseNotes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#0F67FD',
                  color: '#fff',
                  fontWeight: 'bold',
                  marginTop: '20px',
                }}
              >
                Book Appointment
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </ColorModeContext.Provider>
  );
};

export default BookAppointment;
