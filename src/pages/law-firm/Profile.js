import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Globe, Users, Scale, Clock, Edit, Save, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const ProfileSection = ({ title, children }) => (
  <div className="mb-8">
    <h4 className="text-xl font-semibold text-gray-800 mb-4">{title}</h4>
    <div className="bg-white shadow rounded-lg p-6">{children}</div>
  </div>
);

const InfoItem = ({ icon: Icon, label, value, isEditing, onChange }) => (
  <div className="flex items-center mb-4 last:mb-0">
    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
      <Icon className="text-blue-600" size={20} />
    </div>
    <div className="flex-grow">
      <p className="text-sm text-gray-600">{label}</p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(label, e.target.value)}
          className="text-base text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        />
      ) : (
        <p className="text-base text-gray-800 font-medium">{value}</p>
      )}
    </div>
  </div>
);

const LawFirmProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firmInfo, setFirmInfo] = useState({
    name: 'Smith & Associates',
    tagline: 'Excellence in Legal Practice',
    description: 'Smith & Associates is a leading law firm specializing in corporate law, intellectual property, and litigation. With over 50 years of combined experience, our team of dedicated attorneys is committed to providing exceptional legal services to businesses and individuals alike.',
    contact: {
      email: 'info@smithassociates.com',
      phone: '(555) 123-4567',
      address: '123 Legal Street, Lawville, ST 12345',
      website: 'www.smithassociates.com'
    },
    stats: {
      founded: '1985',
      attorneys: '25+',
      practiceAreas: '10+'
    },
    expertise: [
      'Corporate Law',
      'Intellectual Property',
      'Litigation',
      'Real Estate',
      'Employment Law',
      'Mergers & Acquisitions'
    ]
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const handleChange = (field, value) => {
    setFirmInfo(prevInfo => ({
      ...prevInfo,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFirmInfo(prevInfo => ({
      ...prevInfo,
      contact: {
        ...prevInfo.contact,
        [field]: value
      }
    }));
  };

  const handleStatsChange = (field, value) => {
    setFirmInfo(prevInfo => ({
      ...prevInfo,
      stats: {
        ...prevInfo.stats,
        [field]: value
      }
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-white">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={firmInfo.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="text-3xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">{firmInfo.name}</h1>
                )}
                <div>
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="mr-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                        <Save size={20} />
                      </button>
                      <button onClick={handleCancel} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <button onClick={handleEdit} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                      <Edit size={20} />
                    </button>
                  )}
                </div>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={firmInfo.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="text-xl text-gray-600 mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                />
              ) : (
                <p className="text-xl text-gray-600 mt-2">{firmInfo.tagline}</p>
              )}
            </div>

            <ProfileSection title="About Us">
              {isEditing ? (
                <textarea
                  value={firmInfo.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="text-gray-700 w-full h-32 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-700">{firmInfo.description}</p>
              )}
            </ProfileSection>

            <ProfileSection title="Contact Information">
              <InfoItem icon={Mail} label="Email" value={firmInfo.contact.email} isEditing={isEditing} onChange={handleContactChange} />
              <InfoItem icon={Phone} label="Phone" value={firmInfo.contact.phone} isEditing={isEditing} onChange={handleContactChange} />
              <InfoItem icon={MapPin} label="Address" value={firmInfo.contact.address} isEditing={isEditing} onChange={handleContactChange} />
              <InfoItem icon={Globe} label="Website" value={firmInfo.contact.website} isEditing={isEditing} onChange={handleContactChange} />
            </ProfileSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileSection title="Firm Statistics">
                <InfoItem icon={Building} label="Founded" value={firmInfo.stats.founded} isEditing={isEditing} onChange={handleStatsChange} />
                <InfoItem icon={Users} label="Attorneys" value={firmInfo.stats.attorneys} isEditing={isEditing} onChange={handleStatsChange} />
                <InfoItem icon={Scale} label="Practice Areas" value={firmInfo.stats.practiceAreas} isEditing={isEditing} onChange={handleStatsChange} />
              </ProfileSection>

              <ProfileSection title="Areas of Expertise">
                {isEditing ? (
                  <textarea
                    value={firmInfo.expertise.join('\n')}
                    onChange={(e) => handleChange('expertise', e.target.value.split('\n'))}
                    className="text-gray-700 w-full h-32 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <ul className="list-disc list-inside text-gray-700">
                    {firmInfo.expertise.map((area, index) => (
                      <li key={index} className="mb-2">{area}</li>
                    ))}
                  </ul>
                )}
              </ProfileSection>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LawFirmProfile;