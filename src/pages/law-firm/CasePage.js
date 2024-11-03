import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Trash2 } from 'lucide-react';
import { Layout } from './Layout';
import { Link, useNavigate } from 'react-router-dom';


const allCaseData = [
  [
    { id: 1, title: "High court divorce case", clientName: "Steve Haworth", caseType: "AIB Professional Firm", status: "Ongoing", date: { day: 14, month: "TUE" }, documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"] },
    { id: 2, title: "State court mediation", clientName: "Steve Haworth", caseType: "AIB Professional Firm", status: "Pending", date: { day: 14, month: "TUE" }, documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"] },
    { id: 3, title: "Family court discovery", clientName: "Steve Haworth", caseType: "AIB Professional Firm", status: "Completed", date: { day: 14, month: "TUE" }, documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"] },
    { id: 4, title: "High court divorce case", clientName: "Steve Haworth", caseType: "AIB Professional Firm", status: "Closed", date: { day: 14, month: "TUE" }, documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"] },
    { id: 5, title: "State court mediation", clientName: "Steve Haworth", caseType: "AIB Professional Firm", status: "Completed", date: { day: 14, month: "TUE" }, documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"] },
  ],
  [
    { id: 6, title: "Corporate merger case", clientName: "Emma Johnson", caseType: "Corporate Law", status: "Ongoing", date: { day: 15, month: "WED" }, documents: ["Merger Agreement.pdf", "Financial Statements.pdf"] },
    { id: 7, title: "Intellectual property dispute", clientName: "Michael Chen", caseType: "IP Law", status: "Pending", date: { day: 15, month: "WED" }, documents: ["Patent Filing.pdf", "Infringement Claim.pdf"] },
    { id: 8, title: "Environmental compliance audit", clientName: "Green Corp", caseType: "Environmental Law", status: "Ongoing", date: { day: 15, month: "WED" }, documents: ["Audit Report.pdf", "Compliance Checklist.pdf"] },
    { id: 9, title: "Employment discrimination suit", clientName: "Sarah Lee", caseType: "Labor Law", status: "Pending", date: { day: 15, month: "WED" }, documents: ["Complaint.pdf", "Employee Records.pdf"] },
    { id: 10, title: "Real estate contract negotiation", clientName: "Robert Brown", caseType: "Real Estate Law", status: "Completed", date: { day: 15, month: "WED" }, documents: ["Contract Draft.pdf", "Property Valuation.pdf"] },
  ],
  [
    { id: 11, title: "Criminal defense case", clientName: "John Doe", caseType: "Criminal Law", status: "Ongoing", date: { day: 16, month: "THU" }, documents: ["Police Report.pdf", "Witness Statements.pdf"] },
    { id: 12, title: "International trade dispute", clientName: "Global Trading Co.", caseType: "International Law", status: "Pending", date: { day: 16, month: "THU" }, documents: ["Trade Agreement.pdf", "Customs Documentation.pdf"] },
    { id: 13, title: "Medical malpractice suit", clientName: "Emily White", caseType: "Medical Law", status: "Ongoing", date: { day: 16, month: "THU" }, documents: ["Medical Records.pdf", "Expert Testimony.pdf"] },
    { id: 14, title: "Bankruptcy filing", clientName: "Tech Startup Inc.", caseType: "Bankruptcy Law", status: "Completed", date: { day: 16, month: "THU" }, documents: ["Financial Statements.pdf", "Creditor List.pdf"] },
    { id: 15, title: "Child custody dispute", clientName: "David Wilson", caseType: "Family Law", status: "Pending", date: { day: 16, month: "THU" }, documents: ["Custody Agreement.pdf", "Child Welfare Report.pdf"] },
  ],
  [
    { id: 16, title: "Corporate tax audit", clientName: "Big Corp Ltd.", caseType: "Tax Law", status: "Ongoing", date: { day: 17, month: "FRI" }, documents: ["Tax Returns.pdf", "Audit Findings.pdf"] },
    { id: 17, title: "Product liability lawsuit", clientName: "ConsumerTech", caseType: "Product Liability", status: "Pending", date: { day: 17, month: "FRI" }, documents: ["Incident Report.pdf", "Product Specifications.pdf"] },
    { id: 18, title: "Immigration appeal", clientName: "Maria Garcia", caseType: "Immigration Law", status: "Ongoing", date: { day: 17, month: "FRI" }, documents: ["Visa Application.pdf", "Supporting Documents.pdf"] },
    { id: 19, title: "Cybersecurity breach investigation", clientName: "DataSafe Inc.", caseType: "Cybersecurity Law", status: "Completed", date: { day: 17, month: "FRI" }, documents: ["Incident Report.pdf", "Forensic Analysis.pdf"] },
    { id: 20, title: "Trademark infringement case", clientName: "Fashion Brand X", caseType: "IP Law", status: "Pending", date: { day: 17, month: "FRI" }, documents: ["Trademark Registration.pdf", "Infringement Evidence.pdf"] },
  ],
  [
    { id: 21, title: "Class action lawsuit", clientName: "Consumer Group", caseType: "Civil Litigation", status: "Ongoing", date: { day: 18, month: "SAT" }, documents: ["Complaint.pdf", "Class Certification.pdf"] },
    { id: 22, title: "Antitrust investigation", clientName: "Tech Giant Corp", caseType: "Antitrust Law", status: "Pending", date: { day: 18, month: "SAT" }, documents: ["Market Analysis.pdf", "Competitor Statements.pdf"] },
    { id: 23, title: "International arbitration", clientName: "Multinational Corp", caseType: "International Law", status: "Ongoing", date: { day: 18, month: "SAT" }, documents: ["Arbitration Agreement.pdf", "Dispute Summary.pdf"] },
    { id: 24, title: "Healthcare compliance audit", clientName: "City Hospital", caseType: "Healthcare Law", status: "Completed", date: { day: 18, month: "SAT" }, documents: ["Audit Report.pdf", "Compliance Checklist.pdf"] },
    { id: 25, title: "Maritime insurance dispute", clientName: "Shipping Co. Ltd.", caseType: "Maritime Law", status: "Pending", date: { day: 18, month: "SAT" }, documents: ["Insurance Policy.pdf", "Claim Documents.pdf"] },
  ],
];

const CaseManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const totalPages = 5;
  const navigate = useNavigate();

  const statusColors = {
    Ongoing: "text-blue-600",
    Pending: "text-orange-500",
    Completed: "text-green-500",
    Closed: "text-red-500"
  };

  const filteredCases = allCaseData[currentPage - 1].filter(caseItem => 
    (filterStatus === 'All' || caseItem.status === filterStatus) &&
    (caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Title,Client Name,Case Type,Status,Date\n"
      + filteredCases.map(c => `${c.id},"${c.title}","${c.clientName}","${c.caseType}","${c.status}","${c.date.day} ${c.date.month}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "case_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Cases</h1>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search list"
                    className="pl-10 pr-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select 
                  className="px-4 py-2 bg-white rounded-md shadow"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </select>
                <button 
                  className="flex items-center px-4 py-2 bg-white rounded-md shadow"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download list
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {filteredCases.map((caseItem) => (
                <div key={caseItem.id} className="border-b last:border-b-0 p-4 flex items-center">
                  <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center mr-4 ${caseItem.status === 'Ongoing' ? 'bg-blue-100 text-blue-600' : caseItem.status === 'Pending' ? 'bg-orange-100 text-orange-500' : caseItem.status === 'Completed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    <span className="text-2xl font-bold">{caseItem.date.day}</span>
                    <span className="text-xs">{caseItem.date.month}</span>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{caseItem.title}</h2>
                    <p className="text-sm text-gray-600">Client Name: {caseItem.clientName} | Case Type: {caseItem.caseType}</p>
                    <div className="flex mt-2">
                      {caseItem.documents.map((doc, index) => (
                        <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">{doc}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-4 text-sm ${statusColors[caseItem.status]}`}>● {caseItem.status}</span>
                    <Link to={`/law-firm/case/${caseItem.id}`} className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border-t p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span>5 per page</span>
            <div className="flex items-center">
              <button className="px-3 py-1 mx-1 rounded text-gray-700" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                Prev
              </button>
              {renderPagination()}
              <button className="px-3 py-1 mx-1 rounded text-gray-700" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseManagement;