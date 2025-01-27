import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileInside = () => {
    const { id } = useParams(); // Get the createdBy ID from the URL
    const [lawFirmDetails, setLawFirmDetails] = useState(null); // Law firm data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchLawFirmDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token
                const response = await axios.get(`backend/api/admin/get-law-firm-details/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLawFirmDetails(response.data); // Update state with fetched data
                setLoading(false); // Set loading to false
            } catch (err) {
                console.error('Error fetching law firm details:', err);
                setError('Failed to load law firm details. Please try again later.');
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchLawFirmDetails();
    }, [id]);

    // Show loading or error state
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Ensure lawFirmDetails is defined before rendering
    if (!lawFirmDetails || !lawFirmDetails.lawFirmDetails) {
        return <div>No details available for this law firm. Please ensure the law firm exists and has been configured.</div>;
    }

    // Destructure for cleaner JSX
    const { lawFirmDetails: details } = lawFirmDetails;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>{details.lawFirmName}</h2>
                <p>{details.contactInfo.email}</p>
                <p>{details.contactInfo.mobile}</p>
            </div>

            <div className="profile-content">
                <h3>Address</h3>
                <p>{details.contactInfo.address.line1}</p>
                <p>{details.contactInfo.address.city}, {details.contactInfo.address.state}</p>
                <p>{details.contactInfo.address.postalCode}</p>
            </div>
        </div>
    );
};

export default ProfileInside;
