import React, { useState } from 'react';
import { Layout } from './Layout';
import { User, Mail, Phone, MapPin, Briefcase, DollarSign, Search, ChevronDown, ChevronUp } from 'lucide-react';

const MOCK_LAWYERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    location: 'New York, NY',
    lawyerType: 'Criminal Defense',
    specializedIn: ['Criminal Defense', 'Civil Rights'],
    casesSolved: 150,
    timeBasedRate: 200,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 987 654 3210',
    location: 'Los Angeles, CA',
    lawyerType: 'Corporate',
    specializedIn: ['Corporate Law', 'Intellectual Property'],
    casesSolved: 200,
    timeBasedRate: 250,
  },
  // Add more mock data as needed
];

const LawyersList = () => {
  const [lawyers, setLawyers] = useState(MOCK_LAWYERS);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLawyers = React.useMemo(() => {
    let sortableLawyers = [...lawyers];
    if (sortConfig.key !== null) {
      sortableLawyers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLawyers;
  }, [lawyers, sortConfig]);

  const filteredLawyers = sortedLawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.lawyerType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Lawyers Directory</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and view your team of legal professionals
          </p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="relative rounded-md shadow-sm w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="pl-10 w-full rounded-md border border-gray-300 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search lawyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add scrollable container */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {['Name', 'Contact', 'Location', 'Lawyer Type', 'Specializations', 'Cases Solved', 'Hourly Rate'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                  >
                    <div className="flex items-center">
                      {header}
                      <span className="ml-2">
                        {sortConfig.key === header.toLowerCase().replace(' ', '') ? 
                          (sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : 
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        }
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLawyers.map((lawyer) => (
                <tr key={lawyer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <User className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{lawyer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {lawyer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {lawyer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {lawyer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {lawyer.lawyerType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {lawyer.specializedIn.map((specialization, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">
                          {specialization}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lawyer.casesSolved}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${lawyer.timeBasedRate}/hr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default LawyersList;