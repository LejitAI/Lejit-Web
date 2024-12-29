import React, { useState } from "react";
import "./AddClient.css";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddClient = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: null,
    gender: "",
    customGender: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[+]?[\d\s()-]{7,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (formData.gender === "other" && !formData.customGender.trim()) {
      newErrors.customGender = "Please specify a gender.";
    }
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid phone number.";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.postal.trim()) {
      newErrors.postal = "Postal code is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const address = `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.postal}, ${formData.country}`;

        const dataToSubmit = {
          name: formData.name,
          dateOfBirth: formData.dob?.toISOString().split("T")[0],
          gender: formData.gender === "other" ? formData.customGender : formData.gender,
          email: formData.email,
          mobile: formData.mobile,
          address,
          profilePhoto: formData.profilePhoto
            ? await convertFileToBase64(formData.profilePhoto)
            : null,
        };

        const response = await fetch("backend/api/admin/add-client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage("Client added successfully!");
          console.log("Client details:", result.client);
          setFormData({
            name: "",
            dob: null,
            gender: "",
            customGender: "",
            mobile: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            postal: "",
            country: "",
            profilePhoto: null,
          });
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.message || "Failed to add client."}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="add-client-overlay">
      <div className="add-client-container">
        <button className="close-button" onClick={onClose} aria-label="Close form">
          <FaTimes />
        </button>
        <header className="add-client-header">
          <h2 className="add-client-title">Add A Client</h2>
          <p className="add-client-subtitle">Complete the personal details to add offline clients.</p>
        </header>
        <form className="add-client-form" onSubmit={handleSubmit}>
          {message && <p className="message">{message}</p>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <DatePicker
                selected={formData.dob}
                onChange={(date) => setFormData({ ...formData, dob: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                maxDate={new Date()}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select id="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formData.gender === "other" && (
                <input
                  type="text"
                  id="customGender"
                  placeholder="Specify gender"
                  value={formData.customGender}
                  onChange={handleChange}
                />
              )}
              {errors.gender && <span className="error">{errors.gender}</span>}
              {errors.customGender && <span className="error">{errors.customGender}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="+1 (201) 555 555"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="abc@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="form-row">
              <input
                type="text"
                id="address1"
                placeholder="Address line 1"
                value={formData.address1}
                onChange={handleChange}
              />
              <input
                type="text"
                id="address2"
                placeholder="Address line 2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                id="city"
                placeholder="City/District"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                id="state"
                placeholder="State/Province"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                id="postal"
                placeholder="Postal Code"
                value={formData.postal}
                onChange={handleChange}
              />
              {errors.postal && <span className="error">{errors.postal}</span>}
              <input
                type="text"
                id="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary">
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
