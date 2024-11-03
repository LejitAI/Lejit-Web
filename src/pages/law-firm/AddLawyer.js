import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { User, Mail, Calendar, MapPin, Phone, Book, Briefcase, DollarSign, Award, School, FileText, Upload, Bookmark } from 'lucide-react';

const LAWYER_TYPES = [
  "Criminal Defense",
  "Corporate",
  "Family Law",
  "Real Estate",
  "Intellectual Property",
  "Tax",
  "Employment",
  "Immigration",
  "Environmental",
  "Civil Rights"
];

const SPECIALIZATIONS = [
  "Divorce Law",
  "Criminal Defense",
  "Corporate Law",
  "Real Estate Law",
  "Patent Law",
  "Employment Law",
  "Family Law",
  "Immigration Law",
  "Tax Law",
  "Civil Litigation"
];

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-md transition-all ${
      active
        ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
    }`}
  >
    {Icon && <Icon className="mr-1" size={16} />}
    {children}
  </button>
);

const FormField = ({ label, children, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-xs font-semibold mb-1">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const AddLawyer = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    phone: '',
    email: '',
    location: '',
    dateOfBirth: '',
    profileImage: null,
    profileImagePreview: '',

    // Professional Details
    lawyerType: '',
    governmentId: '',
    degreeType: '',
    degreeInstitution: '',
    specializedIn: [],
    casesSolved: '',
    timeBasedRate: '',
    caseBasedRate: '',
    monthlyRate: '',

    // Bank Details
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    saveCard: false
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSpecializationChange = (specialization) => {
    setFormData(prev => ({
      ...prev,
      specializedIn: prev.specializedIn.includes(specialization)
        ? prev.specializedIn.filter(item => item !== specialization)
        : [...prev.specializedIn, specialization]
    }));
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-md mb-6 shadow-md">
          <h1 className="text-2xl font-bold mb-2 text-white">Team Member Details</h1>
          <p className="text-sm opacity-90">
            Complete your profile details to help clients understand your background and expertise.
          </p>
        </div>

        <div className="bg-white rounded-md shadow-md">
          <div className="flex border-b overflow-x-auto">
            <TabButton
              active={activeTab === 'personal'}
              onClick={() => setActiveTab('personal')}
              icon={User}
            >
              Personal Details
            </TabButton>
            <TabButton
              active={activeTab === 'professional'}
              onClick={() => setActiveTab('professional')}
              icon={Briefcase}
            >
              Professional Details
            </TabButton>
            <TabButton
              active={activeTab === 'bank'}
              onClick={() => setActiveTab('bank')}
              icon={DollarSign}
            >
              Bank Account Details
            </TabButton>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-24 h-24 mb-3">
                        {formData.profileImagePreview ? (
                          <img
                            src={formData.profileImagePreview}
                            alt="Profile preview"
                            className="w-full h-full rounded-full object-cover border-2 border-blue-100"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={36} className="text-gray-400" />
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-500 transition-colors">
                          <Upload size={16} className="text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-600">Upload profile picture</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Full Name">
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </FormField>

                    <FormField label="Phone Number">
                      <div className="relative">
                        <Phone className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </FormField>
                  </div>

                  <FormField label="Email Address">
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Location">
                      <div className="relative">
                        <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your location"
                        />
                      </div>
                    </FormField>

                    <FormField label="Date of Birth">
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </FormField>
                  </div>
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Lawyer Type">
                      <div className="relative">
                        <Briefcase className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          name="lawyerType"
                          value={formData.lawyerType}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select lawyer type</option>
                          {LAWYER_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormField>

                    <FormField label="Government ID">
                      <div className="relative">
                        <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="governmentId"
                          value={formData.governmentId}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your government ID"
                        />
                      </div>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Degree Type">
                      <div className="relative">
                        <School className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="degreeType"
                          value={formData.degreeType}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your degree type"
                        />
                      </div>
                    </FormField>

                    <FormField label="Degree Institution">
                      <div className="relative">
                        <School className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="degreeInstitution"
                          value={formData.degreeInstitution}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your institution name"
                        />
                      </div>
                    </FormField>
                  </div>

                  <FormField label="Cases Solved">
                    <div className="relative">
                      <Award className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        name="casesSolved"
                        value={formData.casesSolved}
                        onChange={handleChange}
                        className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter approximate number of cases solved"
                      />
                    </div>
                  </FormField>

                  <FormField label="Specializations">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {SPECIALIZATIONS.map((specialization) => (
                        <label
                          key={specialization}
                          className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={formData.specializedIn.includes(specialization)}
                            onChange={() => handleSpecializationChange(specialization)}
                            className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2">{specialization}</span>
                        </label>
                      ))}
                    </div>
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="Time-Based Rate ($/hr)">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="number"
                          name="timeBasedRate"
                          value={formData.timeBasedRate}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter rate"
                        />
                      </div>
                    </FormField>

                    <FormField label="Case-Based Rate ($)">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="number"
                          name="caseBasedRate"
                          value={formData.caseBasedRate}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter rate"
                        />
                      </div>
                    </FormField>

                    <FormField label="Monthly Rate ($)">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="number"
                          name="monthlyRate"
                          value={formData.monthlyRate}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter rate"
                        />
                      </div>
                    </FormField>
                  </div>
                </div>
              )}

              {activeTab === 'bank' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Account Holder Name">
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="accountHolderName"
                          value={formData.accountHolderName}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter account holder name"
                        />
                      </div>
                    </FormField>

                    <FormField label="Account Number">
                      <div className="relative">
                        <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter account number"
                        />
                      </div>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Bank Name">
                      <div className="relative">
                        <Briefcase className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter bank name"
                        />
                      </div>
                    </FormField>

                    <FormField label="Branch Name">
                      <div className="relative">
                        <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="branchName"
                          value={formData.branchName}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter branch name"
                        />
                      </div>
                    </FormField>
                  </div>

                  <FormField label="IFSC Code">
                    <div className="relative">
                      <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="Card Number">
                      <div className="relative">
                        <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter card number"
                        />
                      </div>
                    </FormField>

                    <FormField label="Expiration Date">
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                    </FormField>

                    <FormField label="CVV">
                      <div className="relative">
                        <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="pl-8 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter CVV"
                        />
                      </div>
                    </FormField>
                  </div>

                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleChange}
                      className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-gray-700 text-xs">
                      Save this card for future payments
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddLawyer;