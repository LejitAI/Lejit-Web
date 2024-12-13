import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, X } from 'lucide-react';
import { Layout } from './Layout';

const allAppointmentData = [
    [
      { id: 1, clientName: "John Doe", caseType: "Family Dispute Case", date: "22nd August", time: "2:00 pm - 4:00 pm", description: "The client was charged with multiple counts of fraud and faced significant prison time. The client...", imageUrl: "/image1.jpg" },
      { id: 2, clientName: "Jane Smith", caseType: "Corporate Litigation", date: "23rd August", time: "10:00 am - 12:00 pm", description: "Representing a major corporation in a complex litigation case involving intellectual property disputes...", imageUrl: "/image2.jpg" },
      { id: 3, clientName: "Robert Johnson", caseType: "Criminal Defense", date: "24th August", time: "1:00 pm - 3:00 pm", description: "Defending a client against serious criminal charges. The case involves multiple witnesses and forensic evidence..." , imageUrl: "/image3.jpg"},
      { id: 4, clientName: "Emily Brown", caseType: "Real Estate Law", date: "25th August", time: "11:00 am - 1:00 pm", description: "Assisting a client with a complicated real estate transaction involving multiple properties and zoning issues...", imageUrl: "/image4.jpg" },
      { id: 5, clientName: "Michael Wilson", caseType: "Employment Law", date: "26th August", time: "3:00 pm - 5:00 pm", description: "Representing an employee in a wrongful termination lawsuit against a large corporation...", imageUrl: "/image5.jpg" },
    ],
    [
      { id: 6, clientName: "Sarah Davis", caseType: "Immigration Law", date: "27th August", time: "9:00 am - 11:00 am", description: "Helping a client navigate the complex process of obtaining permanent residency..." , imageUrl: "/image5.jpg"},
      { id: 7, clientName: "David Miller", caseType: "Personal Injury", date: "28th August", time: "2:30 pm - 4:30 pm", description: "Representing a client who suffered severe injuries in a car accident caused by a negligent driver..." , imageUrl: "/image4.jpg"},
      { id: 8, clientName: "Jennifer Taylor", caseType: "Bankruptcy Law", date: "29th August", time: "10:30 am - 12:30 pm", description: "Assisting a client in filing for Chapter 7 bankruptcy and negotiating with creditors..." , imageUrl: "/image1.jpg"},
      { id: 9, clientName: "William Anderson", caseType: "Environmental Law", date: "30th August", time: "1:30 pm - 3:30 pm", description: "Representing a group of homeowners in a lawsuit against a company for environmental contamination...", imageUrl: "/image3.jpg" },
      { id: 10, clientName: "Lisa Thomas", caseType: "Intellectual Property", date: "31st August", time: "11:30 am - 1:30 pm", description: "Helping a client secure patents for their innovative technology and advising on potential infringement issues..." , imageUrl: "/image2.jpg"},
    ],
    [
      { id: 11, clientName: "Mark Johnson", caseType: "Family Dispute Case", date: "1st September", time: "9:00 am - 11:00 am", description: "Mediating a complex child custody dispute between divorced parents with international residences...", imageUrl: "/image4.jpg"},
      { id: 12, clientName: "Amanda Lee", caseType: "Corporate Litigation", date: "2nd September", time: "1:00 pm - 3:00 pm", description: "Defending a tech startup against allegations of patent infringement from a larger competitor...", imageUrl: "/image3.jpg" },
      { id: 13, clientName: "Christopher White", caseType: "Criminal Defense", date: "3rd September", time: "10:00 am - 12:00 pm", description: "Representing a client accused of cybercrime in a high-profile case with national security implications..." , imageUrl: "/image2.jpg"},
      { id: 14, clientName: "Sophia Martinez", caseType: "Real Estate Law", date: "4th September", time: "2:00 pm - 4:00 pm", description: "Negotiating a complex commercial lease agreement for a multi-use development project..." , imageUrl: "/image5.jpg"},
      { id: 15, clientName: "Daniel Thompson", caseType: "Employment Law", date: "5th September", time: "11:00 am - 1:00 pm", description: "Advising a company on compliance with new labor regulations and updating employee contracts..." , imageUrl: "/image1.jpg"},
    ],
    [
      { id: 16, clientName: "Olivia Clark", caseType: "Immigration Law", date: "6th September", time: "3:00 pm - 5:00 pm", description: "Assisting a skilled worker in appealing a visa denial and navigating the appeals process..." , imageUrl: "/image2.jpg"},
      { id: 17, clientName: "Ethan Wright", caseType: "Personal Injury", date: "7th September", time: "9:30 am - 11:30 am", description: "Representing a group of plaintiffs in a class-action lawsuit against a pharmaceutical company..." , imageUrl: "/image3.jpg"},
      { id: 18, clientName: "Isabella Rodriguez", caseType: "Bankruptcy Law", date: "8th September", time: "1:30 pm - 3:30 pm", description: "Guiding a small business through the process of Chapter 11 bankruptcy and restructuring...", imageUrl: "/image4.jpg" },
      { id: 19, clientName: "Noah Turner", caseType: "Environmental Law", date: "9th September", time: "11:00 am - 1:00 pm", description: "Challenging a proposed industrial development on grounds of environmental impact and zoning violations..." , imageUrl: "/image1.jpg"},
      { id: 20, clientName: "Ava Patel", caseType: "Intellectual Property", date: "10th September", time: "2:00 pm - 4:00 pm", description: "Negotiating a complex licensing agreement for a revolutionary medical device..." , imageUrl: "/image5.jpg"},
    ],
    [
      { id: 21, clientName: "Liam Foster", caseType: "Family Dispute Case", date: "11th September", time: "10:00 am - 12:00 pm", description: "Handling a sensitive adoption case involving international jurisdictions and cultural considerations..." , imageUrl: "/image3.jpg"},
      { id: 22, clientName: "Emma Nelson", caseType: "Corporate Litigation", date: "12th September", time: "1:00 pm - 3:00 pm", description: "Representing shareholders in a dispute over corporate governance and financial mismanagement..." , imageUrl: "/image1.jpg"},
      { id: 23, clientName: "Mason Hughes", caseType: "Criminal Defense", date: "13th September", time: "3:00 pm - 5:00 pm", description: "Defending a client against white-collar crime charges in a complex financial fraud case..." , imageUrl: "/image2.jpg"},
      { id: 24, clientName: "Charlotte Reed", caseType: "Real Estate Law", date: "14th September", time: "9:00 am - 11:00 am", description: "Resolving a boundary dispute between neighboring property owners with historical land claims...", imageUrl: "/image4.jpg" },
      { id: 25, clientName: "Elijah Morgan", caseType: "Employment Law", date: "15th September", time: "2:00 pm - 4:00 pm", description: "Representing a whistleblower in a case against a large corporation for unsafe working conditions..." , imageUrl: "/image5.jpg"},
    ],
]



const AppointmentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = allAppointmentData.length;

  const filteredAppointments = allAppointmentData[currentPage - 1].filter(appointment =>
    (appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.caseType.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === '' || appointment.caseType === filterType)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setIsFilterOpen(false);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Client Name,Case Type,Date,Time,Description\n"
      + filteredAppointments.map(a => `${a.id},"${a.clientName}","${a.caseType}","${a.date}","${a.time}","${a.description}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "appointments.csv");
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
              <h1 className="text-2xl font-bold">My Appointments</h1>
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
                <div className="relative">
                  <button 
                    className="flex items-center px-4 py-2 bg-white rounded-md shadow"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {["Family Dispute Case", "Corporate Litigation", "Criminal Defense", "Real Estate Law", "Employment Law", "Immigration Law", "Personal Injury", "Bankruptcy Law", "Environmental Law", "Intellectual Property"].map((type) => (
                          <button
                            key={type}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                            onClick={() => handleFilter(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className="flex items-center px-4 py-2 bg-white rounded-md shadow"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download list
                </button>
              </div>
            </div>

            {filterType && (
              <div className="mb-4 flex items-center">
                <span className="mr-2">Filtered by:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                  {filterType}
                  <button onClick={() => setFilterType('')} className="ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-2">Appointment Request</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="inline-block mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {appointment.date}, {appointment.time}
                  </p>
                  <div className="flex items-center mb-4">
                    <img src={appointment.imageUrl} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold">{appointment.clientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.caseType}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Case Description:</strong> {appointment.description}
                  </p>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">DECLINE</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">ACCEPT</button>
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
              <button 
                className="px-3 py-1 mx-1 rounded text-gray-700" 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {renderPagination()}
              <button 
                className="px-3 py-1 mx-1 rounded text-gray-700" 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentManagement;