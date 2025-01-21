import React, { useState } from 'react';
import './AddUser.css';

const AddUser = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');

    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        yearsOfExperience: '',
        mobile: '',
        email: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
        },
    });

    const [professionalDetails, setProfessionalDetails] = useState({
        lawyerType: '',
        governmentID: '',
        degreeType: '',
        degreeInstitution: '',
        specialization: '',
    });

    const [bankAccountDetails, setBankAccountDetails] = useState({
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
    });

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!personalDetails.name) newErrors.name = "Name is required";
            if (!personalDetails.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
            if (!personalDetails.gender) newErrors.gender = "Gender is required";
            if (!personalDetails.email) newErrors.email = "Email is required";
            if (!personalDetails.mobile) newErrors.mobile = "Mobile number is required";
        }
        if (step === 2) {
            if (!professionalDetails.lawyerType) newErrors.lawyerType = "Lawyer type is required";
            if (!professionalDetails.governmentID) newErrors.governmentID = "Government ID is required";
            if (!professionalDetails.degreeType) newErrors.degreeType = "Degree type is required";
        }
        if (step === 3 && paymentMethod === 'Card') {
            if (!bankAccountDetails.cardDetails.cardNumber) newErrors.cardNumber = "Card number is required";
            if (!bankAccountDetails.cardDetails.expirationDate) newErrors.expirationDate = "Expiration date is required";
            if (!bankAccountDetails.cardDetails.cvv) newErrors.cvv = "CVV is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        const filteredBankAccountDetails = {
            paymentMethod,
            ...(paymentMethod === 'Card' ? { cardDetails: bankAccountDetails.cardDetails } : {}),
            ...(paymentMethod === 'Bank' ? { bankDetails: bankAccountDetails.bankDetails } : {}),
            ...(paymentMethod === 'UPI' ? { upiId: bankAccountDetails.upiId } : {}),
        };

        const data = {
            personalDetails,
            professionalDetails,
            bankAccountDetails: filteredBankAccountDetails,
            password: 'securepassword123', 
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('backend/api/admin/add-team-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSubmissionMessage(`Thank you, ${result.teamMember.personalDetails.name}. Your email ${result.teamMember.personalDetails.email} has been successfully registered.`);
            } else {
                const errorData = await response.json();
                setSubmissionMessage(`Failed to add team member: ${errorData.message || "An error occurred."}`);
                if (errorData.errors) {
                    setErrors(errorData.errors);  
                }
            }
        } catch (error) {
            setSubmissionMessage('Error: Unable to connect to the server.');
        }
    };

    const handleNext = () => {
        if (validateStep()) {
            if (step === 3) {
                handleSubmit();
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleInputChange = (e, section, field) => {
        const { name, value, type, checked } = e.target;

        if (section === 'personalDetails') {
            setPersonalDetails((prev) => ({
                ...prev,
                [field || name]: type === 'checkbox' ? checked : value,
            }));
        } else if (section === 'professionalDetails') {
            setProfessionalDetails((prev) => ({
                ...prev,
                [field || name]: value,
            }));
        } else if (section === 'bankAccountDetails') {
            if (field) {
                setBankAccountDetails((prev) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [name]: type === 'checkbox' ? checked : value,
                    },
                }));
            } else {
                setBankAccountDetails((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Personal Details</h3>
                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={personalDetails.name}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Full name"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select
                                name="gender"
                                value={personalDetails.gender}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                            >
                                <option>Select your gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.gender && <span className="error-text">{errors.gender}</span>}
                        </div>
                        <div className="form-group">
                            <label>Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={personalDetails.dateOfBirth}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                            />
                            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                        </div>
                        <div className="form-group">
                            <label>Years of Experience *</label>
                            <input
                                type="number"
                                name="yearsOfExperience"
                                value={personalDetails.yearsOfExperience}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Years of experience"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={personalDetails.email}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Email"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Mobile *</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={personalDetails.mobile}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Mobile number"
                            />
                            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Professional Details</h3>
                        <div className="form-group">
                            <label>Lawyer Type *</label>
                            <select
                                name="lawyerType"
                                value={professionalDetails.lawyerType}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                            >
                                <option>Select lawyer type</option>
                                <option>Criminal Lawyer</option>
                                <option>Civil Lawyer</option>
                                <option>Corporate Lawyer</option>
                                <option>Other</option>
                            </select>
                            {errors.lawyerType && <span className="error-text">{errors.lawyerType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Government ID *</label>
                            <input
                                type="text"
                                name="governmentID"
                                value={professionalDetails.governmentID}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Government ID"
                            />
                            {errors.governmentID && <span className="error-text">{errors.governmentID}</span>}
                        </div>
                        <div className="form-group">
                            <label>Degree Type *</label>
                            <select
                                name="degreeType"
                                value={professionalDetails.degreeType}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                            >
                                <option>Select degree type</option>
                                <option>LLB</option>
                                <option>LLM</option>
                                <option>PhD</option>
                            </select>
                            {errors.degreeType && <span className="error-text">{errors.degreeType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Degree Institution *</label>
                            <input
                                type="text"
                                name="degreeInstitution"
                                value={professionalDetails.degreeInstitution}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Institution name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Specialized In *</label>
                            <input
                                type="text"
                                name="specialization"
                                value={professionalDetails.specialization}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Specialization"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Bank Account Details</h3>
                        <div className="form-group">
                            <label>Pay with</label>
                            <div className="payment-method-toggle">
                                <button
                                    className={`toggle-button ${paymentMethod === 'Card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('Card')}
                                >
                                    Card
                                </button>
                                <button
                                    className={`toggle-button ${paymentMethod === 'Bank' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('Bank')}
                                >
                                    Bank
                                </button>
                                <button
                                    className={`toggle-button ${paymentMethod === 'UPI' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('UPI')}
                                >
                                    UPI
                                </button>
                            </div>
                        </div>
                        {paymentMethod === 'Card' && (
                            <>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={bankAccountDetails.cardDetails.cardNumber}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="Card number"
                                    />
                                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Expiration Date</label>
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        value={bankAccountDetails.cardDetails.expirationDate}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="MM/YY"
                                    />
                                    {errors.expirationDate && <span className="error-text">{errors.expirationDate}</span>}
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={bankAccountDetails.cardDetails.cvv}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="CVV"
                                    />
                                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                                </div>
                                <div className="form-group checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="saveCard"
                                        checked={bankAccountDetails.cardDetails.saveCard}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                    />
                                    <label>Save Card details</label>
                                </div>
                            </>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="add-user-modal">
            <div className="add-user-content">
                <div className="header">
                    <button className="back-button" onClick={() => setStep(step - 1)} disabled={step === 1}>
                        &lt; Back
                    </button>
                    <h2>Add Team Member</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="progress-bar">
                    <div className={`progress-line ${step > 1 ? 'completed' : ''}`}></div>
                    <div className={`progress-line ${step > 2 ? 'completed' : ''}`}></div>
                </div>
                <div className="step-indicators">
                    <div className={`step-indicator ${step === 1 ? 'active' : ''}`}>
                        <span>STEP 1<br />Personal Details</span>
                    </div>
                    <div className={`step-indicator ${step === 2 ? 'active' : ''}`}>
                        <span>STEP 2<br />Professional Details</span>
                    </div>
                    <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
                        <span>STEP 3<br />Bank Details</span>
                    </div>
                </div>
                {submissionMessage ? (
                    <div className="submission-message">{submissionMessage}</div>
                ) : (
                    <div className="form-content">{renderStepContent()}</div>
                )}
                {!submissionMessage && (
                    <div className="actions">
                        <button className="secondary-button" onClick={() => setStep(step - 1)} disabled={step === 1}>
                            Cancel
                        </button>
                        <button className="primary-button" onClick={handleNext}>
                            {step === 3 ? 'Submit' : 'Next'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddUser;
import React, { useState } from 'react';
import './AddUser.css';

const AddUser = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');

    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        yearsOfExperience: '',
        mobile: '',
        email: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
        },
    });

    const [professionalDetails, setProfessionalDetails] = useState({
        lawyerType: '',
        governmentID: '',
        degreeType: '',
        degreeInstitution: '',
        specialization: '',
    });

    const [bankAccountDetails, setBankAccountDetails] = useState({
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
    });

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!personalDetails.name) newErrors.name = "Name is required";
            if (!personalDetails.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
            if (!personalDetails.gender) newErrors.gender = "Gender is required";
            if (!personalDetails.email) newErrors.email = "Email is required";
            if (!personalDetails.mobile) newErrors.mobile = "Mobile number is required";
        }
        if (step === 2) {
            if (!professionalDetails.lawyerType) newErrors.lawyerType = "Lawyer type is required";
            if (!professionalDetails.governmentID) newErrors.governmentID = "Government ID is required";
            if (!professionalDetails.degreeType) newErrors.degreeType = "Degree type is required";
        }
        if (step === 3 && paymentMethod === 'Card') {
            if (!bankAccountDetails.cardDetails.cardNumber) newErrors.cardNumber = "Card number is required";
            if (!bankAccountDetails.cardDetails.expirationDate) newErrors.expirationDate = "Expiration date is required";
            if (!bankAccountDetails.cardDetails.cvv) newErrors.cvv = "CVV is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        const filteredBankAccountDetails = {
            paymentMethod,
            ...(paymentMethod === 'Card' ? { cardDetails: bankAccountDetails.cardDetails } : {}),
            ...(paymentMethod === 'Bank' ? { bankDetails: bankAccountDetails.bankDetails } : {}),
            ...(paymentMethod === 'UPI' ? { upiId: bankAccountDetails.upiId } : {}),
        };

        const data = {
            personalDetails,
            professionalDetails,
            bankAccountDetails: filteredBankAccountDetails,
            password: 'securepassword123', 
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('backend/api/admin/add-team-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSubmissionMessage(`Thank you, ${result.teamMember.personalDetails.name}. Your email ${result.teamMember.personalDetails.email} has been successfully registered.`);
            } else {
                const errorData = await response.json();
                setSubmissionMessage(`Failed to add team member: ${errorData.message || "An error occurred."}`);
                if (errorData.errors) {
                    setErrors(errorData.errors);  
                }
            }
        } catch (error) {
            setSubmissionMessage('Error: Unable to connect to the server.');
        }
    };

    const handleNext = () => {
        if (validateStep()) {
            if (step === 3) {
                handleSubmit();
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleInputChange = (e, section, field) => {
        const { name, value, type, checked } = e.target;

        if (section === 'personalDetails') {
            setPersonalDetails((prev) => ({
                ...prev,
                [field || name]: type === 'checkbox' ? checked : value,
            }));
        } else if (section === 'professionalDetails') {
            setProfessionalDetails((prev) => ({
                ...prev,
                [field || name]: value,
            }));
        } else if (section === 'bankAccountDetails') {
            if (field) {
                setBankAccountDetails((prev) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [name]: type === 'checkbox' ? checked : value,
                    },
                }));
            } else {
                setBankAccountDetails((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Personal Details</h3>
                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={personalDetails.name}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Full name"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select
                                name="gender"
                                value={personalDetails.gender}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                            >
                                <option>Select your gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.gender && <span className="error-text">{errors.gender}</span>}
                        </div>
                        <div className="form-group">
                            <label>Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={personalDetails.dateOfBirth}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                            />
                            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                        </div>
                        <div className="form-group">
                            <label>Years of Experience *</label>
                            <input
                                type="number"
                                name="yearsOfExperience"
                                value={personalDetails.yearsOfExperience}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Years of experience"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={personalDetails.email}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Email"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Mobile *</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={personalDetails.mobile}
                                onChange={(e) => handleInputChange(e, 'personalDetails')}
                                placeholder="Mobile number"
                            />
                            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Professional Details</h3>
                        <div className="form-group">
                            <label>Lawyer Type *</label>
                            <select
                                name="lawyerType"
                                value={professionalDetails.lawyerType}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                            >
                                <option>Select lawyer type</option>
                                <option>Criminal Lawyer</option>
                                <option>Civil Lawyer</option>
                                <option>Corporate Lawyer</option>
                                <option>Other</option>
                            </select>
                            {errors.lawyerType && <span className="error-text">{errors.lawyerType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Government ID *</label>
                            <input
                                type="text"
                                name="governmentID"
                                value={professionalDetails.governmentID}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Government ID"
                            />
                            {errors.governmentID && <span className="error-text">{errors.governmentID}</span>}
                        </div>
                        <div className="form-group">
                            <label>Degree Type *</label>
                            <select
                                name="degreeType"
                                value={professionalDetails.degreeType}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                            >
                                <option>Select degree type</option>
                                <option>LLB</option>
                                <option>LLM</option>
                                <option>PhD</option>
                            </select>
                            {errors.degreeType && <span className="error-text">{errors.degreeType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Degree Institution *</label>
                            <input
                                type="text"
                                name="degreeInstitution"
                                value={professionalDetails.degreeInstitution}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Institution name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Specialized In *</label>
                            <input
                                type="text"
                                name="specialization"
                                value={professionalDetails.specialization}
                                onChange={(e) => handleInputChange(e, 'professionalDetails')}
                                placeholder="Specialization"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-section">
                        <h3 className="section-title">Bank Account Details</h3>
                        <div className="form-group">
                            <label>Pay with</label>
                            <div className="payment-method-toggle">
                                <button
                                    className={`toggle-button ${paymentMethod === 'Card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('Card')}
                                >
                                    Card
                                </button>
                                <button
                                    className={`toggle-button ${paymentMethod === 'Bank' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('Bank')}
                                >
                                    Bank
                                </button>
                                <button
                                    className={`toggle-button ${paymentMethod === 'UPI' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('UPI')}
                                >
                                    UPI
                                </button>
                            </div>
                        </div>
                        {paymentMethod === 'Card' && (
                            <>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={bankAccountDetails.cardDetails.cardNumber}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="Card number"
                                    />
                                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Expiration Date</label>
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        value={bankAccountDetails.cardDetails.expirationDate}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="MM/YY"
                                    />
                                    {errors.expirationDate && <span className="error-text">{errors.expirationDate}</span>}
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={bankAccountDetails.cardDetails.cvv}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                        placeholder="CVV"
                                    />
                                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                                </div>
                                <div className="form-group checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="saveCard"
                                        checked={bankAccountDetails.cardDetails.saveCard}
                                        onChange={(e) => handleInputChange(e, 'bankAccountDetails', 'cardDetails')}
                                    />
                                    <label>Save Card details</label>
                                </div>
                            </>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="add-user-modal">
            <div className="add-user-content">
                <div className="header">
                    <button className="back-button" onClick={() => setStep(step - 1)} disabled={step === 1}>
                        &lt; Back
                    </button>
                    <h2>Add Team Member</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="progress-bar">
                    <div className={`progress-line ${step > 1 ? 'completed' : ''}`}></div>
                    <div className={`progress-line ${step > 2 ? 'completed' : ''}`}></div>
                </div>
                <div className="step-indicators">
                    <div className={`step-indicator ${step === 1 ? 'active' : ''}`}>
                        <span>STEP 1<br />Personal Details</span>
                    </div>
                    <div className={`step-indicator ${step === 2 ? 'active' : ''}`}>
                        <span>STEP 2<br />Professional Details</span>
                    </div>
                    <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
                        <span>STEP 3<br />Bank Details</span>
                    </div>
                </div>
                {submissionMessage ? (
                    <div className="submission-message">{submissionMessage}</div>
                ) : (
                    <div className="form-content">{renderStepContent()}</div>
                )}
                {!submissionMessage && (
                    <div className="actions">
                        <button className="secondary-button" onClick={() => setStep(step - 1)} disabled={step === 1}>
                            Cancel
                        </button>
                        <button className="primary-button" onClick={handleNext}>
                            {step === 3 ? 'Submit' : 'Next'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddUser;