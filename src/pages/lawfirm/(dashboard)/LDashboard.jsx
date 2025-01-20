import React, { useState, useEffect } from "react";
import "./LDashboard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "./components/MetricCard";
import {
  File,
  CheckCheck,
  DollarSign,
  MessageCircle,
  PartyPopper,
  ClipboardList,
  X,
  CircleX,
  CircleCheck,
  User,
  BarChart3,
} from "lucide-react";
import { Calendar, ChevronRight, Plus, Phone, XCircle } from "lucide-react";
import { FaFolder, FaCalendar, FaTrophy } from "react-icons/fa";
import AskAI from "../global/AskAI";
import GenericCard from "./components/GenericCard";
const randomAvatar =
  "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/92/92f6386ba5544c151dbce85dd4b42dafa510eeea.jpg";

const LDashboard = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use useState to manage dynamic data
  const [updates, setUpdates] = useState([
    {
      icon: ChevronRight,
      category: "Case Update",
      title: "New evidence submitted for Case #123",
      detailsLink: "/cases/123",
    },
    {
      icon: Calendar,
      category: "Meeting",
      title: "Client meeting scheduled for Case #456",
      detailsLink: "/cases/456",
    },
    {
      icon: PartyPopper,
      category: "Court Hearing",
      title: "Court hearing scheduled for Case #789",
      detailsLink: "/cases/789",
    },
  ]);
  const [pending, setPendingUpdates] = useState([
    {
      title: "New evidence submitted for Case #123",
      timePeriod: "March 2023-April 2023",
      detailsLink: "/cases/123",
    },
    {
      title: "Client meeting scheduled for Case #456",
      timePeriod: "March 2023-April 2023",
      detailsLink: "/cases/456",
    },
  ]);
  const [members, setMembers] = useState([]);

  const [hearings, setHearings] = useState([
    {
      clientName: "Alice Johnson",
      matter: "Property Dispute",
      duration: "2 hours",
      courtName: "Supreme Court",
      contact: "alice.johnson@example.com",
    },
    {
      clientName: "Bob Brown",
      matter: "Contract Violation",
      duration: "1.5 hours",
      courtName: "District Court",
      contact: "bob.brown@example.com",
    },
    {
      clientName: "Charlie Davis",
      matter: "Personal Injury",
      duration: "3 hours",
      courtName: "High Court",
      contact: "charlie.davis@example.com",
    },
  ]);
  const [pendingAppointments, setPendingAppointments] = useState([
    {
      clientAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      clientName: "John Doe",
      caseType: "Divorce Case",
      time: "10:00 AM",
    },
    {
      clientAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      clientName: "Jane Smith",
      caseType: "Property Dispute",
      time: "11:30 AM",
    },
  ]);
  const [appointments, setAppointments] = useState([
    {
      date: "2025-01-11", // Today
      cases: [
        {
          clientAvatar: randomAvatar,
          clientName: "John Doe",
          caseType: "Family Dispute Case",
          time: "2:00 PM - 4:00 PM",
        },
        {
          clientAvatar: randomAvatar,
          clientName: "Sarah Wilson",
          caseType: "Property Dispute",
          time: "4:30 PM - 5:30 PM",
        },
      ],
    },
    {
      date: "2025-01-12", // Tomorrow
      cases: [
        {
          clientAvatar: randomAvatar,
          clientName: "Michael Brown",
          caseType: "Contract Violation",
          time: "10:00 AM - 11:00 AM",
        },
      ],
    },
    {
      date: "2025-01-13", // Day after tomorrow
      cases: [], // Empty day
    },
    {
      date: "2025-01-14",
      cases: [
        {
          clientAvatar: randomAvatar,
          clientName: "Emily Davis",
          caseType: "Civil Case",
          time: "1:00 PM - 2:30 PM",
        },
        {
          clientAvatar: randomAvatar,
          clientName: "James Wilson",
          caseType: "Corporate Law",
          time: "3:00 PM - 4:00 PM",
        },
      ],
    },
    {
      date: "2025-01-15",
      cases: [], // Empty day
    },
    {
      date: "2025-01-16",
      cases: [
        {
          clientAvatar: randomAvatar,
          clientName: "Alice Johnson",
          caseType: "Real Estate Dispute",
          time: "11:00 AM - 12:00 PM",
        },
      ],
    },
  ]);
  // Function to add a new member
  const addNewMember = () => {
    const newMember = {
      name: "New Member",
      role: "Junior Attorney",
      avatar: randomAvatar,
    };
    setMembers([...members, newMember]);
  };

  useEffect(() => {
    fetchCases();
    const fetchTeamMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching team members...'); // Debug log
        const response = await fetch('http://backend.lejit.ai/backend/api/admin/get-team-members', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Initialize with some test data if API returns empty
        if (!data || data.length === 0) {
          setMembers([
            { personalDetails: { name: 'John Doe' } },
            { personalDetails: { name: 'Jane Smith' } }
          ]);
        } else {
          setMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Set some test data on error for debugging
        setMembers([
          { personalDetails: { name: 'Test User 1' } },
          { personalDetails: { name: 'Test User 2' } }
        ]);
      }
    };

    fetchTeamMembers();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch('http://backend.lejit.ai/backend/api/admin/get-cases', { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cases response:', data);
      setCases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setError(error.message);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics with safety checks
  const activeCases = Array.isArray(cases) ? cases.filter(c => c && !c.endDate).length : 0;
  const closedCases = Array.isArray(cases) ? cases.filter(c => c && c.endDate).length : 0;

  if (error) {
    console.error('Error in dashboard:', error);
  }

  return (
    <div className="max-h-screen overflow-auto grid grid-cols-4 gap-6 p-6">
      {/* Analytics Navigation Button */}
      <div className="col-span-4 flex justify-end mb-4">
        <button
          onClick={() => navigate('/analytics')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BarChart3 size={20} />
          <span>View Analytics</span>
        </button>
      </div>

      <div className="col-span-3 space-y-6">
        {/* Metric Cards */}
        <div className="w-full flex gap-6">
          <Card color="#D4EED0" title="Active Cases" number={activeCases.toString().padStart(2, '0')} icon={File} />
          <Card color="#F4C7AC" title="Closed Cases" number={closedCases.toString().padStart(2, '0')} icon={CheckCheck} />
          <Card color="#C0E1F8" title="Pending Payments" number="05" icon={DollarSign} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <GenericCard
            heading="Client Appointments"
            viewAllLink={() => navigate("/appointments")}
          >
            {appointments.length > 0 ? (
              <ClientAppointments appointments={appointments} />
            ) : (
              <EmptyState
                icon={<Phone className="w-10 h-10 text-gray-500" />}
                message="No appointments scheduled"
              />
            )}
          </GenericCard>
          <GenericCard
            heading="Pending Appointments"
            viewAllLink={() => navigate("/appointments")}          >
            {appointments.length > 0 ? (
              <PendingAppointments appointments={pendingAppointments} />
            ) : (
              <EmptyState
                icon={<Phone className="w-10 h-10 text-gray-500" />}
                message="No appointments scheduled"
              />
            )}
          </GenericCard>
          <GenericCard
            heading="Pending Court Filings"
            viewAllLink={() => console.log("View all filings")}
          >
            {updates.length > 0 ? (
              <GenericCaseList cases={pending} pending={true} />
            ) : (
              <EmptyState
                icon={<ClipboardList className="w-10 h-10 text-gray-500" />}
                message="No recent updates"
              />
            )}
          </GenericCard>

          <GenericCard
            heading="Recent Cases"
            viewAllLink={() => navigate("/overallcases")}
          >
            {updates.length > 0 ? (
              <GenericCaseList cases={pending} />
            ) : (
              <EmptyState
                icon={<ClipboardList className="w-10 h-10 text-gray-500" />}
                message="No recent updates"
              />
            )}
          </GenericCard>
          <div className="col-span-2">
            <GenericCard
              heading="Court Hearings"
              viewAllLink={() => navigate("/hearing")}
            >
              {hearings.length > 0 ? (
                <CourtHearingsTable hearings={hearings} />
              ) : (
                <EmptyState
                  icon={<XCircle className="w-10 h-10 text-gray-500" />}
                  message="No court hearings scheduled"
                />
              )}
            </GenericCard>
          </div>
        </div>
      </div>

      <div className="space-y-6 ">
        <GenericCard
          heading="Recent Updates"
          viewAllLink={() => console.log("View all recent updates")}
        >
          {updates.length > 0 ? (
            <RecentUpdatesList updates={updates} />
          ) : (
            <EmptyState
              icon={<ClipboardList className="w-10 h-10 text-gray-500" />}
              message="No recent updates"
            />
          )}
        </GenericCard>

        <GenericCard
          heading="Team Members"
          viewAllLink={() => navigate("/profile")}
        >
          {members.length > 0 ? (
            <TeamMembersList members={members} onAddMember={addNewMember} />
          ) : (
            <EmptyState
              icon={<XCircle className="w-10 h-10 text-gray-500" />}
              message="No team members available"
            />
          )}
        </GenericCard>
        <AskAI />
      </div>
    </div>
  );
};

export default LDashboard;

// Empty State Component
const EmptyState = ({ icon, message }) => (
  <div className="flex justify-center items-center p-6 bg-gray-50 rounded-lg text-gray-500 ">
    <div className=" flex items-center">
      {icon}
      <p>{message}</p>
    </div>
  </div>
);

// Recent Updates List Component
const RecentUpdatesList = ({ updates, pending: False }) => (
  <div className="space-y-3">
    {updates.map((update, index) => (
      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 flex justify-center items-center bg-blue-100 text-blue-500 rounded-full mr-4">
          {update.icon && <update.icon className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{update.category}</p>
          <h3 className="text-sm font-medium">{update.title}</h3>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>
    ))}
  </div>
);

// Team Members List Component
const TeamMembersList = ({ members, onAddMember }) => {
  console.log('Members received in TeamMembersList:', members); // Debug log
  return (
    <div className="space-y-3">
      {Array.isArray(members) && members.map((member, index) => {
        console.log('Individual member data:', member); // Debug log
        return (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex-1">
              <span className="text-sm text-gray-600">
                {member?.personalDetails?.name || 'Team Member'}
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-5 h-5" />
          </div>
        );
      })}
      
      <button
        onClick={onAddMember}
        className="w-full flex items-center justify-center gap-2 p-3 text-blue-500 hover:bg-blue-50"
      >
        <Plus className="w-5 h-5" />
        Add New Member
      </button>
    </div>
  );
};

// Court Hearings Table Component
const CourtHearingsTable = ({ hearings }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="text-sm text-gray-500">
        <tr>
          <th className="text-left pb-2">Client Name</th>
          <th className="text-left pb-2">Matter</th>
          <th className="text-left pb-2">Duration</th>
          <th className="text-left pb-2">Court</th>
          <th className="text-left pb-2">Contact</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {hearings.map((hearing, index) => (
          <tr key={index} className="border-t">
            <td className="py-3">{hearing.clientName}</td>
            <td className="py-3">{hearing.matter}</td>
            <td className="py-3">{hearing.duration}</td>
            <td className="py-3">{hearing.courtName}</td>
            <td className="py-3">
              <button className="text-gray-400 hover:text-gray-600">
                <MessageCircle className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const GenericCaseList = ({ cases, pending }) => {
  pending = pending || false;
  return (
    <div className="space-y-3">
      {cases.map((caseItem, index) => (
        <div
          key={index}
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {caseItem.title}{" "}
              {pending && <span className="text-yellow-500">(Pending)</span>}
            </p>
            <h3 className="text-sm font-medium">{caseItem.timePeriod}</h3>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      ))}
    </div>
  );
};

// Pending Appointments Component
const PendingAppointments = ({ appointments }) => (
  <div className="space-y-3 bg-gray-100 rounded-lg  ">
    {appointments.map((appointment, index) => (
      <div key={index} className="grid gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex  flex-row items-center mb-2">
          <img
            src={appointment.clientAvatar}
            alt={appointment.clientName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{appointment.clientName}</h3>
            <p className="text-sm text-gray-500">{appointment.caseType}</p>
          </div>
          <div className="flex gap-2">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <Phone className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <p className="text-sm text-gray-600 ">
          <hr className=" h-[2px] bg-gray-200 border-0" />
          Appointment Request: {appointment.time}
        </p>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
            <CircleX className="w-5 h-5" />
            Reject
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
            <CircleCheck className="w-5 h-5" />
            Accept
          </button>
        </div>
      </div>
    ))}
  </div>
);

const ClientAppointments = ({ appointments }) => {
  // Get current date and format it
  const getCurrentDates = () => {
    const dates = [];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        day: days[date.getDay()],
        date: date.getDate().toString(),
        month: months[date.getMonth()],
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return dates;
  };

  const [dates] = useState(getCurrentDates());
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);

  // Filter appointments for selected date
  const filteredAppointments =
    appointments.find((appointment) => appointment.date === selectedDate)
      ?.cases || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    className: "w-full",
  };

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-sm">
      {/* Date Selector */}
      <div className="flex justify-between mb-8">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date.fullDate)}
            className={`flex flex-col items-center ${
              selectedDate === date.fullDate
                ? "bg-blue-600 text-white rounded-2xl"
                : "text-gray-600"
            } p-3 transition-all duration-200`}
          >
            <span className="text-xs mb-1">{date.day}</span>
            <span className="text-lg font-semibold mb-1">{date.date}</span>
            <span className="text-xs">{date.month}</span>
            <div
              className={`h-1 w-1 rounded-full mt-1 ${
                selectedDate === date.fullDate ? "bg-white" : "bg-blue-600"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      {filteredAppointments.length > 0 ? (
        <Slider {...settings}>
          {filteredAppointments.map((appointment, index) => (
            <div key={index} className="px-1">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={appointment.clientAvatar}
                    alt={appointment.clientName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">
                      {appointment.clientName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {appointment.caseType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="hover:text-blue-600">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="hover:text-blue-600">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <hr className=" h-[2px] bg-gray-200 border-0" />
                <div className="mt-2 pt-2 ">
                  <p className="text-sm text-gray-600">
                    Appointment Time: {appointment.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No appointments scheduled for this date
        </div>
      )}
    </div>
  );
};

ClientAppointments.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      cases: PropTypes.arrayOf(
        PropTypes.shape({
          clientAvatar: PropTypes.string.isRequired,
          clientName: PropTypes.string.isRequired,
          caseType: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};