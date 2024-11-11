import React, { useState, useEffect, createContext, useContext } from 'react';
import { Calendar, Phone, Plus, ChevronRight, ChevronLeft, FileText, Search, BookOpen, GavelIcon, PartyPopperIcon, AlertCircle, Check, CreditCard, Building, Smartphone} from 'lucide-react';
import { Layout } from './Layout';
import { Link } from 'react-router-dom';

const mockData = {
  genders: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
  years: Array.from({ length: 5 }, (_, i) => `Year ${i + 1}`),
  lawTypes: ['Criminal Law', 'Civil Law', 'Corporate Law', 'Family Law', 'Immigration Law'],
  degrees: ['LLB', 'JD', 'LLM', 'PhD in Law'],
  institutions: ['Harvard Law School', 'Yale Law School', 'Stanford Law School', 'Columbia Law School'],
  specializations: ['Criminal Defense', 'Corporate Finance', 'Intellectual Property', 'Human Rights']
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Team Members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


// Create a new UserContext
const UserContext = createContext();

// Mock user data
const mockUser = {
  name: "John Doe",
  role: "Firm Manager",
  permissions: {
    dashboard: { view: true },
    cases: { view: true, create: true, edit: true, delete: true, approve: true },
    tasks: { view: true, create: true, edit: true, delete: true, approve: true },
    user_types: { view: true, create: true, edit: true, delete: true, approve: true },
    users: { view: true, create: true, edit: true, delete: true, approve: true },
    appointments: { view: true, create: true, edit: true, delete: true, approve: true },
    templates: { view: true, create: true, edit: true, delete: true, approve: true },
    knowledge_hub: { view: true, create: true, edit: true, delete: true, approve: true },
    clients: { view: true, create: true, edit: true, delete: true, approve: true },
    notifications: { view: true },
    analytics: { view: true },
    settings: { view: true, edit: true }
  }
};

// Create a UserProvider component
const UserProvider = ({ children }) => (
  <UserContext.Provider value={{ user: mockUser }}>
    {children}
  </UserContext.Provider>
);

// Create a custom hook to use the UserContext
const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const TeamMembersList = ({ onSelect, onAddMember }) => {
  const teamMembers = [
    { img:'/image1.jpg',name: 'John Doe', type: 'Family Dispute Case' },
    { img:'/image2.jpg',name: 'Sean Jones', type: 'Corporate Case' },
    { img:'/image3.jpg',name: 'Will Miller', type: 'Contract Case' },
    { img:'/image4.jpg',name: 'Will Damon', type: 'Corporate Case' },
    { img:'/image5.jpg',name: 'Sean Jones', type: 'Family Dispute Case' },
  ];

  return (
    <div className="space-y-4 p-4">
      {teamMembers.map((member, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <input
            type="radio"
            name="teamMember"
            className="w-4 h-4 text-blue-600 cursor-pointer"
            onChange={() => onSelect(member)}
          />
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-500">{member.type}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex space-x-4 mt-8">
        <button
          onClick={onAddMember}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Add Team Member
        </button>
        <button 
          className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const PersonalDetailsForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName?.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dob?.trim()) newErrors.dob = 'Date of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm">STEP 1</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gray-200">
          <div className="w-0 h-full bg-blue-600" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center">
            2
          </div>
          <span className="text-sm">STEP 2</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gray-200" />
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
            3
          </div>
          <span className="text-sm">STEP 3</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Personal Details</h3>
        <p className="text-sm text-gray-500">
          Complete the personal details to help clients understand your background and expertise.
        </p>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              value={formData.fullName || ''}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <div className="absolute right-3 top-3 text-red-500">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.dob || ''}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className={`p-3 border rounded-lg w-full ${errors.dob ? 'border-red-500' : ''}`}
              />
              {errors.dob && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
            <select
              value={formData.gender || ''}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="p-3 border rounded-lg"
            >
              <option value="">Select your gender</option>
              {mockData.genders.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.year || ''}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="p-3 border rounded-lg"
            >
              <option value="">Select your Year</option>
              {mockData.years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="relative">
              <input
                type="tel"
                placeholder="+1 (201) 555 555"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`p-3 border rounded-lg w-full ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="abc@email.com"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <div className="absolute right-3 top-3 text-red-500">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address line 1"
              value={formData.addressLine1 || ''}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address line 2"
              value={formData.addressLine2 || ''}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              className="p-3 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City/District"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State/Province"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="p-3 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const ProfessionalDetailsForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.lawType) newErrors.lawType = 'Law type is required';
    if (!formData.licenseNumber?.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm">STEP 1</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-blue-600" />
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm">STEP 2</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gray-200" />
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
            3
          </div>
          <span className="text-sm">STEP 3</span>
        </div>
      </div>

      <div className="space-y-4">
        <select
          value={formData.lawType || ''}
          onChange={(e) => setFormData({ ...formData, lawType: e.target.value })}
          className={`w-full p-3 border rounded-lg ${errors.lawType ? 'border-red-500' : ''}`}
        >
          <option value="">Select the type of law preferred</option>
          {mockData.lawTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="XX-XXXX-XXXX-XX"
            value={formData.licenseNumber || ''}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            className={`w-full p-3 border rounded-lg ${errors.licenseNumber ? 'border-red-500' : ''}`}
          />
          {errors.licenseNumber && (
            <div className="absolute right-3 top-3 text-red-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
        </div>

        <select
          value={formData.degree || ''}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          className={`w-full p-3 border rounded-lg ${errors.degree ? 'border-red-500' : ''}`}
        >
          <option value="">Choose Degree Type</option>
          {mockData.degrees.map((degree) => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>

        <select
          value={formData.institution || ''}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Choose Institution</option>
          {mockData.institutions.map((institution) => (
            <option key={institution} value={institution}>{institution}</option>
          ))}
        </select>

        <select
          value={formData.specialization || ''}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Choose Specialization</option>
          {mockData.specializations.map((specialization) => (
            <option key={specialization} value={specialization}>{specialization}</option>
          ))}
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const BankDetailsForm = ({ onSubmit, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    switch (formData.paymentMethod) {
      case 'card':
        if (!formData.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate?.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv?.trim()) newErrors.cvv = 'CVV is required';
        break;
      case 'bank':
        if (!formData.accountNumber?.trim()) newErrors.accountNumber = 'Account number is required';
        if (!formData.ifscCode?.trim()) newErrors.ifscCode = 'IFSC code is required';
        if (!formData.accountHolderName?.trim()) newErrors.accountHolderName = 'Account holder name is required';
        break;
      case 'upi':
        if (!formData.upiId?.trim()) newErrors.upiId = 'UPI ID is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'bank':
        return <Building className="w-4 h-4" />;
      case 'upi':
        return <Smartphone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderFormFields = () => {
    switch (formData.paymentMethod) {
      case 'card':
        return (
          <>
            <div className="relative">
              <input
                type="text"
                placeholder="1234 5678 9101 1121"
                value={formData.cardNumber || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '';
                  setFormData({ ...formData, cardNumber: value });
                }}
                maxLength="19"
                className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-500' : ''}`}
              />
              {errors.cardNumber && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    const formattedValue = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
                    setFormData({ ...formData, expiryDate: formattedValue });
                  }}
                  maxLength="5"
                  className={`p-3 border rounded-lg w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
                />
                {errors.expiryDate && (
                  <div className="absolute right-3 top-3 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="CVV"
                  value={formData.cvv || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, cvv: value });
                  }}
                  maxLength="3"
                  className={`p-3 border rounded-lg w-full ${errors.cvv ? 'border-red-500' : ''}`}
                />
                {errors.cvv && (
                  <div className="absolute right-3 top-3 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.saveCard || false}
                onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-500">Save card details</span>
            </label>
          </>
        );

      case 'bank':
        return (
          <>
            <div className="relative">
              <input
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber || ''}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className={`w-full p-3 border rounded-lg ${errors.accountNumber ? 'border-red-500' : ''}`}
              />
              {errors.accountNumber && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="IFSC Code"
                value={formData.ifscCode || ''}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                className={`w-full p-3 border rounded-lg ${errors.ifscCode ? 'border-red-500' : ''}`}
              />
              {errors.ifscCode && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Account Holder Name"
                value={formData.accountHolderName || ''}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                className={`w-full p-3 border rounded-lg ${errors.accountHolderName ? 'border-red-500' : ''}`}
              />
              {errors.accountHolderName && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
          </>
        );

      case 'upi':
        return (
          <div className="relative">
            <input
              type="text"
              placeholder="UPI ID (e.g., name@upi)"
              value={formData.upiId || ''}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.upiId ? 'border-red-500' : ''}`}
            />
            {errors.upiId && (
              <div className="absolute right-3 top-3 text-red-500">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm">STEP 1</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-blue-600" />
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm">STEP 2</span>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-blue-600" />
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            3
          </div>
          <span className="text-sm">STEP 3</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          {['card', 'bank', 'upi'].map((method) => (
            <label key={method} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-4 h-4"
              />
              <div className="flex items-center space-x-2">
                {renderPaymentMethodIcon(method)}
                <span className="capitalize">{method}</span>
              </div>
            </label>
          ))}
        </div>

        {renderFormFields()}

        <p className="text-xs text-gray-400">
          Your personal data will be used to process your order, support your experience throughout this website,
          and for other purposes described in our privacy policy.
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const TeamMemberModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    year: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    
    // Professional Details
    lawType: '',
    licenseNumber: '',
    degree: '',
    institution: '',
    specialization: '',
    
    // Bank Details
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const handleClose = () => {
    setIsOpen(false);
    setStep(0);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      year: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      lawType: '',
      licenseNumber: '',
      degree: '',
      institution: '',
      specialization: '',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      saveCard: false
    });
  };

  const handleAddMember = () => {
    setStep(1);
  };

  const handleSubmit = (data) => {
    // Here you would typically send the data to your backend
    console.log('Final form data:', formData);
    handleClose();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <TeamMembersList onAddMember={handleAddMember} onSelect={() => {}} />;
      case 1:
        return (
          <PersonalDetailsForm 
            onNext={() => setStep(2)} 
            onBack={handleClose}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ProfessionalDetailsForm 
            onNext={() => setStep(3)} 
            onBack={() => setStep(1)}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <BankDetailsForm 
            onSubmit={handleSubmit} 
            onBack={() => setStep(2)}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 mt-4 border-2 border-blue-500 text-blue-500 rounded-lg flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>Add New Member</span>
      </button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        {renderStep()}
      </Modal>
    </>
  );
};

const TeamMembers = ({ members }) => (
  <div className="bg-white rounded-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold">Team Members</h3>
      <Link to="/law-firm/view-lawyer">
        <button className="text-blue-500">View All</button>
      </Link>
    </div>
    {members.map((member, index) => (
      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={member.img} 
            alt={member.name} 
            className="rounded-full w-10 h-10 object-cover"
          />
          <div>
            <h4 className="font-semibold">{member.name}</h4>
            <p className="text-gray-500 text-sm">{member.role}</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    ))}
    <TeamMemberModal />
  </div>
);

const MetricsCard = ({ icon, label, value, color }) => (
  <div className={`bg-blue-100 rounded-lg p-4 flex items-center justify-between`}>
    <div className="flex items-center space-x-3">
      <div className={`bg-white rounded-full p-2 ${typeof icon === 'string' ? 'text-blue-500' : ''}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

const AppointmentCalendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const getDaysInWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      return day;
    });
  };

  const daysInWeek = getDaysInWeek(currentDate);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevWeek} className="p-1"><ChevronLeft size={20} /></button>
        <h3 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={handleNextWeek} className="p-1"><ChevronRight size={20} /></button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysInWeek.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${day.toDateString() === selectedDate.toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            onClick={() => onDateSelect(day)}
          >
            <span className="text-xs">{day.toLocaleString('default', { weekday: 'short' }).toUpperCase()}</span>
            <span className="text-lg font-bold">{day.getDate()}</span>
            <span className="text-xs">{day.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppointmentCard = ({ img, name, type, time, showActions = false }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={img} alt={name} className="w-10 h-10 rounded-full" /> {/* Reduced image size */}
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-500 text-sm">{type}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="p-2 rounded-full bg-gray-100">
          <Calendar size={16} />
        </button>
        <button className="p-2 rounded-full bg-gray-100">
          <Phone size={16} />
        </button>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-4">Appointment Request: {time}</p>
    {showActions && (
      <div className="flex space-x-4 mt-4">
        <button className="flex-1 py-2 px-4 bg-red-50 text-red-500 rounded-lg">Reject</button>
        <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-500 rounded-lg">Accept</button>
      </div>
    )}
  </div>
);

const CourtHearingsTable = ({ hearings }) => (
  <div className="bg-white rounded-lg p-6 overflow-x-auto">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold">Court Hearings</h3>
      <button className="text-blue-500">View All</button>
    </div>
    <table className="w-full min-w-[800px]">
      <thead>
        <tr className="text-gray-500 text-sm">
          <th className="text-left pb-4">Client Name</th>
          <th className="text-left pb-4">Matter</th>
          <th className="text-left pb-4">Duration</th>
          <th className="text-left pb-4">Court</th>
          <th className="text-left pb-4">Contact</th>
        </tr>
      </thead>
      <tbody>
        {hearings.map((hearing, index) => (
          <tr key={index} className="border-t">
            <td className="py-4">{hearing.client}</td>
            <td className="py-4">{hearing.matter}</td>
            <td className="py-4">{hearing.duration}</td>
            <td className="py-4">{hearing.court}</td>
            <td className="py-4">
              <button className="p-2 rounded-full bg-gray-100">
                <Calendar size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);



const AskAI = () => (
  <div className="bg-blue-600 text-white rounded-lg p-6 flex">
    <div className="flex-none mr-6">
      <div className="flex flex-col items-center space-y-4">
        <img src="/ai_bot.png" alt="AI Assistant" className="w-16 h-16 object-contain" />
        <h2 className="text-2xl font-bold">Ask AI</h2>
      </div>
    </div>
    <div className="flex-grow space-y-3">
      <button className="w-full py-3 px-4 bg-blue-500 rounded-md flex items-center space-x-3 hover:bg-blue-400 transition-colors">
        <FileText size={20} />
        <span>Draft Template</span>
      </button>
      <button className="w-full py-3 px-4 bg-blue-500 rounded-md flex items-center space-x-3 hover:bg-blue-400 transition-colors">
        <Search size={20} />
        <span>Find Similar Documents</span>
      </button>
      <button className="w-full py-3 px-4 bg-blue-500 rounded-md flex items-center space-x-3 hover:bg-blue-400 transition-colors">
        <BookOpen size={20} />
        <span>Find Citation</span>
      </button>
      <button className="w-full py-3 px-4 bg-blue-500 rounded-md flex items-center space-x-3 hover:bg-blue-400 transition-colors">
        <GavelIcon size={20} />
        <span>Find Case Laws</span>
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    // Simulating API call to fetch appointments based on selected date
    const fetchAppointments = () => {
      // This is where you'd typically make an API call
      const mockAppointments = [
        { img: "/image1.jpg", name: "John Doe", type: "Family Dispute Case", time: "2:00 pm - 4:00 pm" },
        { img: "/image2.jpg", name: "Jane Smith", type: "Property Dispute", time: "4:30 pm - 6:00 pm" },
      ];
      setAppointments(mockAppointments);
    };

    const fetchPendingAppointments = () => {
      // This is where you'd typically make an API call
      const mockPendingAppointments = [
        { img: "/image3.jpg", name: "Alice Johnson", type: "Criminal Case", time: "23 Aug 10:00 am - 11:30 am" },
        { img: "/image4.jpg", name: "Bob Williams", type: "Civil Case", time: "24 Aug 2:00 pm - 3:30 pm" },
      ];
      setPendingAppointments(mockPendingAppointments);
    };

    fetchAppointments();
    fetchPendingAppointments();
  }, [selectedDate]);

  const metricsData = [
    { icon: <FileText />, label: "Ongoing Cases", value: "04" },
    { icon: <FileText />, label: "Closed Cases", value: "34" },
    { icon: "$", label: "Pending Payments", value: "05", color: "blue-50" },
  ];

  const hearings = [
    { client: 'Sankar Das', matter: 'Land Dispute Case', duration: "Mar'23 - Jul'23", court: 'High Court' },
    { client: 'Liya Abraham', matter: 'Land Dispute Case', duration: "Mar'23 - Jul'23", court: 'Supreme Court' },
    { client: 'Leo Das', matter: 'Land Dispute Case', duration: "Mar'23 - Jul'23", court: 'High Court' },
    { client: 'Antony Das', matter: 'Land Dispute Case', duration: "Mar'23 - Jul'23", court: 'Civil Court' },
    { client: 'Maria Fernandez', matter: 'Contract Dispute', duration: "Jan'23 - May'23", court: 'District Court' },
    { client: 'Ravi Kumar', matter: 'Property Dispute', duration: "Apr'23 - Sep'23", court: 'High Court' },
    { client: 'Anjali Verma', matter: 'Employment Dispute', duration: "Feb'23 - Aug'23", court: 'Labor Court' },
  ];

  const recentUpdates = [
    { icon: <FileText />, type: 'New case added', title: 'High Profile Criminal Case' },
    { icon: <Calendar />, type: 'Upcoming Appointment', title: 'Appointment at 4:00 pm t...' },
    { icon: <PartyPopperIcon />, type: 'Case Update', title: 'Congratulations for winni...' },
  ];

  const teamMembers = [
    { img:"/image6.jpeg", name: 'Adela Parkson', role: 'Criminal Case' },
    { img:"/image7.jpeg", name: 'Cristian Mad', role: 'Property Case' },
    { img:"/image8.jpg", name: 'Jason Statham', role: 'Divorce Case' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Metrics Cards */}
        {user.permissions.dashboard.view && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricsData.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {user.permissions.appointments.view && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Appointments Section */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Client Appointment</h3>
                    <button className="text-blue-500">View All</button>
                  </div>
                  <AppointmentCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                  {appointments.map((appointment, index) => (
                    <AppointmentCard key={index} {...appointment} />
                  ))}
                </div>

                {/* Pending Appointments Section */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Pending Appointments</h3>
                    <button className="text-blue-500">View All</button>
                  </div>
                  {pendingAppointments.map((appointment, index) => (
                    <AppointmentCard key={index} {...appointment} showActions />
                  ))}
                </div>
              </div>
            )}

            {/* Court Hearings Table */}
            {user.permissions.cases.view && (
              <CourtHearingsTable hearings={hearings} />
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Updates */}
            {user.permissions.dashboard.view && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Update</h3>
                  <button className="text-blue-500">View All</button>
                </div>
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {update.icon}
                        </div>
                        <div>
                          <p className="text-blue-500 text-sm">{update.type}</p>
                          <p className="font-semibold">{update.title}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Members Section */}
            {user.permissions.users.view && (
              <TeamMembers members={teamMembers} />
            )}

            {/* Ask AI Section */}
            <AskAI />
          </div>
        </div>
      </div>
    </Layout>
  );
};


const DashboardWithProvider = () => (
  <UserProvider>
    <Dashboard />
  </UserProvider>
);

export default DashboardWithProvider;