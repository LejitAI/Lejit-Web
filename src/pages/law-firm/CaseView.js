import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Phone, Share2, Trash2, Download, Eye, Upload } from 'lucide-react';
import { Layout } from './Layout';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy data for the case details
const dummyCaseData = [
    {
      id: 1,
      title: "High court divorce case",
      clientName: "Steve Haworth",
      caseType: "AIB Professional Firm",
      status: "Ongoing",
      date: { day: 14, month: "TUE" },
      documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"],
      hearingDate: "25th October 2024",
      teamMembers: [
        { id: 1, name: "John Doe", role: "Lead Attorney", image: "/image6.jpeg" },
        { id: 2, name: "Jane Smith", role: "Legal Assistant", image: "/image7.jpeg" }
      ],
      caseDocuments: [
        { name: "Property Document.pdf", type: "Court" },
        { name: "Proof.pdf", type: "Evidence" },
        { name: "Licence.pdf", type: "Court" }
      ],
      strategy: {
        overview: "Complex divorce case involving substantial assets and property division.",
        lawPoints: "Application of matrimonial property laws and equity principles.",
        strategyPoints: "Negotiate fair settlement while protecting client's interests.",
        argumentNotch: "Focus on equitable distribution and financial stability."
      }
    },
    {
      id: 2,
      title: "State court mediation",
      clientName: "Steve Haworth",
      caseType: "AIB Professional Firm",
      status: "Pending",
      date: { day: 14, month: "TUE" },
      documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"],
      hearingDate: "28th October 2024",
      teamMembers: [
        { id: 3, name: "Michael Johnson", role: "Mediator", image: "/image8.jpg" },
        { id: 4, name: "Sarah Williams", role: "Legal Counsel", image: "/image6.jpeg" }
      ],
      caseDocuments: [
        { name: "Property Document.pdf", type: "Evidence" },
        { name: "Proof.pdf", type: "Court" },
        { name: "Licence.pdf", type: "Evidence" }
      ],
      strategy: {
        overview: "Mediation to resolve commercial dispute efficiently.",
        lawPoints: "Focus on contractual obligations and dispute resolution mechanisms.",
        strategyPoints: "Aim for mutually beneficial resolution through mediation.",
        argumentNotch: "Emphasize cost-effective and timely resolution."
      }
    },
    {
      id: 6,
      title: "Corporate merger case",
      clientName: "Emma Johnson",
      caseType: "Corporate Law",
      status: "Ongoing",
      date: { day: 15, month: "WED" },
      documents: ["Merger Agreement.pdf", "Financial Statements.pdf"],
      hearingDate: "30th October 2024",
      teamMembers: [
        { id: 5, name: "Robert Chen", role: "Corporate Lawyer", image: "/image7.jpeg" },
        { id: 6, name: "Lisa Wong", role: "Financial Analyst", image: "/image8.jpg" }
      ],
      caseDocuments: [
        { name: "Merger Agreement.pdf", type: "Court" },
        { name: "Financial Statements.pdf", type: "Evidence" }
      ],
      strategy: {
        overview: "Large-scale corporate merger requiring regulatory approval.",
        lawPoints: "Compliance with antitrust laws and corporate regulations.",
        strategyPoints: "Ensure smooth transition and regulatory compliance.",
        argumentNotch: "Focus on market competition and consumer benefits."
      }
    },
    {
      id: 11,
      title: "Criminal defense case",
      clientName: "John Doe",
      caseType: "Criminal Law",
      status: "Ongoing",
      date: { day: 16, month: "THU" },
      documents: ["Police Report.pdf", "Witness Statements.pdf"],
      hearingDate: "1st November 2024",
      teamMembers: [
        { id: 7, name: "David Miller", role: "Defense Attorney", image: "/image7.jpeg" },
        { id: 8, name: "Emily Brown", role: "Investigator", image:"/image6.jpeg" }
      ],
      caseDocuments: [
        { name: "Police Report.pdf", type: "Evidence" },
        { name: "Witness Statements.pdf", type: "Court" }
      ],
      strategy: {
        overview: "Criminal defense case requiring thorough investigation.",
        lawPoints: "Application of criminal procedure and evidence laws.",
        strategyPoints: "Build strong defense based on evidence and witness testimony.",
        argumentNotch: "Challenge prosecution's evidence and establish reasonable doubt."
      }
    },
    {
      id: 16,
      title: "Corporate tax audit",
      clientName: "Big Corp Ltd.",
      caseType: "Tax Law",
      status: "Ongoing",
      date: { day: 17, month: "FRI" },
      documents: ["Tax Returns.pdf", "Audit Findings.pdf"],
      hearingDate: "5th November 2024",
      teamMembers: [
        { id: 9, name: "Thomas Anderson", role: "Tax Attorney", image: "/image8.jpg" },
        { id: 10, name: "Maria Garcia", role: "Tax Consultant", image: "/image6.jpeg"}
      ],
      caseDocuments: [
        { name: "Tax Returns.pdf", type: "Evidence" },
        { name: "Audit Findings.pdf", type: "Court" }
      ],
      strategy: {
        overview: "Complex corporate tax audit with multiple jurisdictions.",
        lawPoints: "Application of tax laws and international tax treaties.",
        strategyPoints: "Demonstrate compliance and resolve discrepancies.",
        argumentNotch: "Focus on proper accounting practices and documentation."
      }
    },
    {
      id: 21,
      title: "Class action lawsuit",
      clientName: "Consumer Group",
      caseType: "Civil Litigation",
      status: "Ongoing",
      date: { day: 18, month: "SAT" },
      documents: ["Complaint.pdf", "Class Certification.pdf"],
      hearingDate: "8th November 2024",
      teamMembers: [
        { id: 11, name: "Jennifer Wilson", role: "Lead Litigator", image: "/image7.jpeg" },
        { id: 12, name: "Mark Thompson", role: "Paralegal", image: "/image8.jpg" }
      ],
      caseDocuments: [
        { name: "Complaint.pdf", type: "Court" },
        { name: "Class Certification.pdf", type: "Evidence" }
      ],
      strategy: {
        overview: "Large-scale class action involving consumer rights.",
        lawPoints: "Consumer protection laws and class action procedures.",
        strategyPoints: "Establish class certification and damages calculation.",
        argumentNotch: "Demonstrate widespread impact and common injuries."
      }
    }
  ];
  

  const CaseView = () => {
    const [caseData, setCaseData] = useState(null);
    const [isStrategyExpanded, setIsStrategyExpanded] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState('All');
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCaseData = () => {
        const foundCase = dummyCaseData.find(c => c.id.toString() === id);
        if (foundCase) {
          setCaseData(foundCase);
        } else {
          console.error('Case not found');
          navigate('/law-firm/manage-case');
        }
      };
  
      fetchCaseData();
    }, [id, navigate]);
  
    const handleBack = () => {
      navigate('/law-firm/manage-case');
    };
  
    const documentTypes = ['All', 'Court', 'Invoice', 'Evidence', 'Others'];
  
    const filteredDocuments = caseData?.caseDocuments.filter(doc => 
      selectedDocType === 'All' ? true : doc.type === selectedDocType
    ) || [];
  
    if (!caseData) {
      return <div>Loading...</div>;
    }
  
    return (
      <Layout>
        <div className="flex flex-col h-full overflow-auto">
          {/* Header Section */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={handleBack} className="mr-4">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-2xl font-semibold">My Cases</h1>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Review Document
                </button>
              </div>
            </div>
          </div>
  
          <div className="flex-grow p-6">
            <div className="max-w-7xl mx-auto">
              {/* Case Overview Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start">
                  <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center mr-4 ${
                    caseData.status === 'Ongoing' ? 'bg-blue-100 text-blue-600' : ''
                  }`}>
                    <span className="text-2xl font-bold">{caseData.date.day}</span>
                    <span className="text-xs">{caseData.date.month}</span>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{caseData.title}</h2>
                    <p className="text-sm text-gray-600">
                      Client Name: {caseData.clientName} | Case Type: {caseData.caseType}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-blue-600 mr-4">● {caseData.status}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
  
                <div className="mt-4">
                  <p className="font-semibold">Hearing Schedules: {caseData.hearingDate}</p>
                </div>
  
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    This case involves complex legal matters requiring careful attention to detail and strategic planning.
                    Our team is dedicated to achieving the best possible outcome for our client.
                  </p>
                </div>
              </div>
  
              {/* Strategy Points Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsStrategyExpanded(!isStrategyExpanded)}>
                  <h3 className="font-semibold">Case Strategy Points</h3>
                  <svg className={`w-5 h-5 transform ${isStrategyExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isStrategyExpanded && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-4">{caseData.strategy.overview}</p>
                    <h4 className="font-semibold mb-2">Law points</h4>
                    <p className="text-sm text-gray-700 mb-4">{caseData.strategy.lawPoints}</p>
                    <h4 className="font-semibold mb-2">Strategy points</h4>
                    <p className="text-sm text-gray-700 mb-4">{caseData.strategy.strategyPoints}</p>
                    <h4 className="font-semibold mb-2">Argument Notch</h4>
                    <p className="text-sm text-gray-700">{caseData.strategy.argumentNotch}</p>
                  </div>
                )}
              </div>
  
              {/* Team Members Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Team Members:</h3>
                  <button className="text-blue-600 text-sm">Add Team Member</button>
                </div>
                {caseData.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center mb-4 last:mb-0">
                    <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                    <div className="flex-grow">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Create Affidavit Button - Now right aligned */}
              <div className="flex justify-end mb-6">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  CREATE AFFIDAVIT
                </button>
              </div>
  
              {/* Case Documents Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Case Documents</h3>
                  <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex space-x-4 mb-4">
                  {documentTypes.map((type) => (
                    <div 
                      key={type} 
                      className="text-center cursor-pointer"
                      onClick={() => setSelectedDocType(type)}
                    >
                      <div className={`w-16 h-16 ${selectedDocType === type ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center mb-1`}>
                        <svg className={`w-8 h-8 ${selectedDocType === type ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <p className="text-xs">{type}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span className="text-sm">{doc.name}</span>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 flex items-center justify-center w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  ADD CASE RELATED DOCUMENTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default CaseView;