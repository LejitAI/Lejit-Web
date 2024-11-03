import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Globe, Users, Scale, Clock, Edit, Save, X, Calendar, FileText, ChevronRight, Award, Briefcase, BookOpen, Hash, Image, Plus, Trash2 } from 'lucide-react';
import { Layout } from './Layout';

const MetricsCard = ({ icon: Icon, label, value, color = 'blue-100' }) => (
  <div className={`bg-${color} rounded-lg p-4 flex items-center justify-between`}>
    <div className="flex items-center space-x-3">
      <div className="bg-white rounded-full p-2">
        <Icon className="text-blue-500" size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

const ProfileSection = ({ title, children, action }) => (
  <div className="bg-white rounded-lg p-6 mb-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {action}
    </div>
    {children}
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
          onChange={(e) => onChange(label.toLowerCase(), e.target.value)}
          className="mt-1 text-base text-gray-800 font-medium border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        />
      ) : (
        <p className="text-base text-gray-800 font-medium">{value}</p>
      )}
    </div>
  </div>
);

const AwardCard = ({ title, date, description, isEditing, onEdit, onDelete }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-4 last:mb-0">
    {isEditing ? (
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => onEdit('title', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Award Title"
        />
        <input
          type="text"
          value={date}
          onChange={(e) => onEdit('date', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Date"
        />
        <textarea
          value={description}
          onChange={(e) => onEdit('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Description"
        />
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 flex items-center"
        >
          <Trash2 size={16} className="mr-1" /> Remove
        </button>
      </div>
    ) : (
      <>
        <div className="flex items-center space-x-3 mb-2">
          <Award className="text-blue-500" size={20} />
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
        <p className="text-sm text-gray-600 mb-1">{date}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </>
    )}
  </div>
);

const TeamMemberCard = ({ img, name, role, cases, experience }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
        <div className="flex space-x-4 mt-1">
          <span className="text-xs text-gray-500">{cases} Cases</span>
          <span className="text-xs text-gray-500">{experience} Experience</span>
        </div>
      </div>
    </div>
    <ChevronRight size={20} className="text-gray-400" />
  </div>
);

const LawFirmProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firmInfo, setFirmInfo] = useState({
    name: 'Smith & Associates',
    logo: '/api/placeholder/150/150',
    registrationNumber: 'LAW123456789',
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
      practiceAreas: '10+',
      casesWon: '500+',
      activeClients: '100+',
      successRate: '95%'
    },
    expertise: [
      'Corporate Law',
      'Intellectual Property',
      'Litigation',
      'Real Estate',
      'Employment Law',
      'Mergers & Acquisitions'
    ],
    awards: [
      {
        title: 'Best Law Firm of the Year',
        date: '2023',
        description: 'Recognized for excellence in corporate law and client satisfaction'
      },
      {
        title: 'Outstanding Legal Services',
        date: '2022',
        description: 'Awarded for exceptional performance in complex litigation cases'
      }
    ],
    teamMembers: [
      { img: "/api/placeholder/150/150", name: 'John Smith', role: 'Managing Partner', cases: '150+', experience: '15 years' },
      { img: "/api/placeholder/150/150", name: 'Sarah Johnson', role: 'Senior Associate', cases: '75+', experience: '8 years' },
      { img: "/api/placeholder/150/150", name: 'Michael Chen', role: 'Partner', cases: '120+', experience: '12 years' }
    ]
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const handleChange = (field, value) => {
    setFirmInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAwardEdit = (index, field, value) => {
    const newAwards = [...firmInfo.awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    handleChange('awards', newAwards);
  };

  const handleAwardDelete = (index) => {
    const newAwards = firmInfo.awards.filter((_, i) => i !== index);
    handleChange('awards', newAwards);
  };

  const handleAddAward = () => {
    const newAward = {
      title: 'New Award',
      date: new Date().getFullYear().toString(),
      description: 'Award description'
    };
    handleChange('awards', [...firmInfo.awards, newAward]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <img
                  src={firmInfo.logo}
                  alt="Firm Logo"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                      <Image className="text-white" size={24} />
                    </label>
                  </div>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={firmInfo.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="text-3xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                    />
                    <input
                      type="text"
                      value={firmInfo.registrationNumber}
                      onChange={(e) => handleChange('registrationNumber', e.target.value)}
                      className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      placeholder="Registration Number"
                    />
                    <input
                      type="text"
                      value={firmInfo.tagline}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      className="text-xl text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800">{firmInfo.name}</h1>
                    <p className="text-sm text-gray-600 mt-1">Reg. No: {firmInfo.registrationNumber}</p>
                    <p className="text-xl text-gray-600 mt-2">{firmInfo.tagline}</p>
                  </>
                )}
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center">
                    <Save size={16} className="mr-2" /> Save
                  </button>
                  <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center">
                    <X size={16} className="mr-2" /> Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                  <Edit size={16} className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricsCard icon={Briefcase} label="Cases Won" value={firmInfo.stats.casesWon} />
          <MetricsCard icon={Users} label="Active Clients" value={firmInfo.stats.activeClients} />
          <MetricsCard icon={Award} label="Success Rate" value={firmInfo.stats.successRate} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <ProfileSection title="About Us">
              {isEditing ? (
                <textarea
                  value={firmInfo.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{firmInfo.description}</p>
              )}
            </ProfileSection>

            {/* Contact Information */}
            <ProfileSection title="Contact Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={Mail} label="Email" value={firmInfo.contact.email} isEditing={isEditing} onChange={(field, value) => handleChange(`contact.${field}`, value)} />
                <InfoItem icon={Phone} label="Phone" value={firmInfo.contact.phone} isEditing={isEditing} onChange={(field, value) => handleChange(`contact.${field}`, value)} />
                <InfoItem icon={MapPin} label="Address" value={firmInfo.contact.address} isEditing={isEditing} onChange={(field, value) => handleChange(`contact.${field}`, value)} />
                <InfoItem icon={Globe} label="Website" value={firmInfo.contact.website} isEditing={isEditing} onChange={(field, value) => handleChange(`contact.${field}`, value)} />
              </div>
            </ProfileSection>

            {/* Team Members */}
            <ProfileSection 
              title="Our Team" 
              action={<button className="text-blue-500 hover:text-blue-600">View All</button>}
            >
              <div className="space-y-4">
                {firmInfo.teamMembers.map((member, index) => (
                  <TeamMemberCard key={index} {...member} />
                ))}
              </div>
            </ProfileSection>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Firm Statistics */}
            <ProfileSection title="Firm Statistics">
              <div className="space-y-4">
              <InfoItem icon={Building} label="Founded" value={firmInfo.stats.founded} isEditing={isEditing} onChange={(field, value) => handleChange(`stats.${field}`, value)} />
                <InfoItem icon={Users} label="Attorneys" value={firmInfo.stats.attorneys} isEditing={isEditing} onChange={(field, value) => handleChange(`stats.${field}`, value)} />
                <InfoItem icon={Scale} label="Practice Areas" value={firmInfo.stats.practiceAreas} isEditing={isEditing} onChange={(field, value) => handleChange(`stats.${field}`, value)} />
              </div>
            </ProfileSection>

            {/* Areas of Expertise */}
            <ProfileSection title="Areas of Expertise">
              {isEditing ? (
                <textarea
                  value={firmInfo.expertise.join('\n')}
                  onChange={(e) => handleChange('expertise', e.target.value.split('\n'))}
                  className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                />
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {firmInfo.expertise.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <Scale size={16} className="text-blue-500" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              )}
            </ProfileSection>

            {/* Awards & Recognition */}
            <ProfileSection 
              title="Awards & Recognition"
              action={
                isEditing ? (
                  <button 
                    onClick={handleAddAward}
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    <Plus size={16} className="mr-1" /> Add Award
                  </button>
                ) : (
                  <button className="text-blue-500 hover:text-blue-600">View All</button>
                )
              }
            >
              {firmInfo.awards.map((award, index) => (
                <AwardCard 
                  key={index} 
                  {...award} 
                  isEditing={isEditing}
                  onEdit={(field, value) => handleAwardEdit(index, field, value)}
                  onDelete={() => handleAwardDelete(index)}
                />
              ))}
            </ProfileSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LawFirmProfile;