const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const ImageForm = require('../models/LawFirm');

// Get public lawyer profile
router.get('/lawyers/:id', async (req, res) => {
    try {
        const lawyer = await TeamMember.findById(req.params.id)
            .select('-password -bankAccountDetails') // Exclude sensitive information
            .populate('createdBy', 'lawFirmDetails.lawFirmName'); // Include law firm name

        if (!lawyer) {
            return res.status(404).json({ message: 'Lawyer not found' });
        }

        // Get law firm details
        const lawFirm = await ImageForm.findOne({ createdBy: lawyer.createdBy })
            .select('lawFirmDetails.lawFirmName lawFirmDetails.specialization');

        // Format the response
        const publicProfile = {
            _id: lawyer._id,
            personalDetails: {
                name: lawyer.personalDetails.name,
                email: lawyer.personalDetails.email,
                mobile: lawyer.personalDetails.mobile,
                gender: lawyer.personalDetails.gender,
                yearsOfExperience: lawyer.personalDetails.yearsOfExperience,
                address: {
                    city: lawyer.personalDetails.address?.city,
                    state: lawyer.personalDetails.address?.state,
                }
            },
            professionalDetails: {
                lawyerType: lawyer.professionalDetails.lawyerType,
                specialization: lawyer.professionalDetails.specialization,
                degreeType: lawyer.professionalDetails.degreeType,
                degreeInstitution: lawyer.professionalDetails.degreeInstitution,
            },
            lawFirm: lawFirm ? {
                name: lawFirm.lawFirmDetails.lawFirmName,
                specialization: lawFirm.lawFirmDetails.specialization
            } : null,
            createdBy: lawyer.createdBy
        };

        res.status(200).json(publicProfile);
    } catch (error) {
        console.error('Error fetching lawyer details:', error);
        res.status(500).json({ message: 'Failed to fetch lawyer details' });
    }
});

module.exports = router; 