import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import './AddCase.css';

Modal.setAppElement('#root');

const AddCase = ({ isOpen, onClose }) => {
    const [caseDetails, setCaseDetails] = useState({
        title: '',
        startingDate: '',
        caseType: '',
        client: '',
        oppositeClient: '',
        caseWitness: '',
        caseDescription: '',
    });
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [errors, setErrors] = useState({});

    const caseTypeOptions = [
        { value: 'Civil', label: 'Civil' },
        { value: 'Criminal', label: 'Criminal' },
        { value: 'Family Law', label: 'Family Law' },
        { value: 'Corporate', label: 'Corporate' },
        { value: 'Intellectual Property', label: 'Intellectual Property' },
        { value: 'Labor Law', label: 'Labor Law' },
        { value: 'Tax Law', label: 'Tax Law' },
        { value: 'Immigration', label: 'Immigration' },
        { value: 'Environmental Law', label: 'Environmental Law' },
        { value: 'Administrative Law', label: 'Administrative Law' },
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCaseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setCaseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: selectedOption ? selectedOption.value : '',
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!caseDetails.title) newErrors.title = 'Case Title is required';
        if (!caseDetails.caseType) newErrors.caseType = 'Case Type is required';
        if (!caseDetails.client) newErrors.client = 'Client is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU4NTJjYzYxMjBiM2JkNTIzZWE3MyIsImlhdCI6MTczMTI0OTUyMSwiZXhwIjoxNzMxMjUzMTIxfQ.9L98w0PeE1SW_GZknckTkLEc37kjgFmvPwEw2XDD_gI';
        const data = { ...caseDetails };

        try {
            const response = await fetch('http://13.232.153.48:5000/api/admin/add-case', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSubmissionMessage(`Case titled "${result.case.title}" was successfully added.`);
            } else {
                const errorData = await response.json();
                setSubmissionMessage(`Failed to add case: ${errorData.message || 'An error occurred.'}`);
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
            }
        } catch (error) {
            setSubmissionMessage('Error: Unable to connect to the server.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="addCaseModal" overlayClassName="modalOverlay">
            <div className="addCaseContainer">
            <div className="addCaseHeader">
                    <h2 className="addCaseTitle">Add Case</h2>
                    <p className="addCaseSubtitle">
                        Provide key details about your case to help clients understand your expertise and experience.
                    </p>
                    <button className="closeButton" onClick={onClose}>×</button>
                </div>

                <div className="addCaseContent">
                    <form className="caseForm">
                        <div className="formGroup">
                            <label>Case Title<span className="required">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={caseDetails.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                            />
                            {errors.title && <span className="error-text">{errors.title}</span>}
                        </div>
                        <div className="formGroup">
                            <label>Starting Date</label>
                            <input
                                type="date"
                                name="startingDate"
                                value={caseDetails.startingDate}
                                onChange={handleInputChange}
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                        <div className="formGroup">
                            <label>Case Type<span className="required">*</span></label>
                            <Select
                                options={caseTypeOptions}
                                name="caseType"
                                value={caseTypeOptions.find(option => option.value === caseDetails.caseType)}
                                onChange={handleSelectChange}
                                placeholder="Select case type"
                                classNamePrefix="react-select"
                            />
                            {errors.caseType && <span className="error-text">{errors.caseType}</span>}
                        </div>
                        <div className="formGroup">
                            <label>Client<span className="required">*</span></label>
                            <input
                                type="text"
                                name="client"
                                value={caseDetails.client}
                                onChange={handleInputChange}
                                placeholder="Client"
                            />
                            {errors.client && <span className="error-text">{errors.client}</span>}
                        </div>
                        <div className="formGroup">
                            <label>Opposite Client</label>
                            <input
                                type="text"
                                name="oppositeClient"
                                value={caseDetails.oppositeClient}
                                onChange={handleInputChange}
                                placeholder="Opposite Client"
                            />
                        </div>
                        <div className="formGroup">
                            <label>Case Witness</label>
                            <input
                                type="text"
                                name="caseWitness"
                                value={caseDetails.caseWitness}
                                onChange={handleInputChange}
                                placeholder="Case Witness"
                            />
                        </div>
                        <div className="formGroup">
                            <label>Case Description</label>
                            <textarea
                                name="caseDescription"
                                value={caseDetails.caseDescription}
                                onChange={handleInputChange}
                                placeholder="Write a short introduction"
                            />
                        </div>
                    </form>

                    {submissionMessage && <div className="submissionMessage">{submissionMessage}</div>}
                </div>

                <div className="prepareDocuments">
                        <div className="iconWrapper">
                            <div className="iconBackground">
                                <span className="icon">📄</span>
                            </div>
                        </div>
                        <div className="documentContent">
                            <p className="documentTitle">Prepare Case Documents</p>
                            <p className="documentSubtitle">
                                Prepare your case documents with the help of ChatGPT and get a list of lawyers who can assist with your case.
                            </p>
                        </div>
                        <div className="arrowWrapper">→</div>
                    </div>

                <div className="addCaseFooter">
                    <button className="cancelButton" onClick={onClose}>Cancel</button>
                    <button className="saveButton" onClick={handleSubmit}>Save Case</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCase;
