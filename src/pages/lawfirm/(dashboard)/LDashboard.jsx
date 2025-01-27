import React, { useState, useEffect } from "react";
import "./LDashboard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Slider from "react-slick";
import AIPopup from "./components/AIPopup";
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
    <div className="max-h-screen overflow-auto grid grid-cols-4 gap-3 p-3">
      {/* Analytics Navigation Button */}
      <div className="col-span-4 flex justify-end mb-1.5">
        <button
          onClick={() => navigate('/analytics')}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-[4px] hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-xs hover:shadow-sm"
        >
          <BarChart3 className="w-3 h-3" />
          <span className="text-[11px] font-medium">View Analytics</span>
        </button>
      </div>

      <div className="col-span-3 space-y-3">
        {/* Metric Cards */}
        <div className="w-full flex gap-3">
          <Card 
            color="#D4EED0" 
            title={<span className="text-[12px] font-medium">Active Cases</span>}
            number={<span className="text-[14px]">{activeCases.toString().padStart(2, '0')}</span>}
            icon={File} 
          />
          <Card 
            color="#F4C7AC" 
            title={<span className="text-[12px] font-medium">Closed Cases</span>}
            number={<span className="text-[14px]">{closedCases.toString().padStart(2, '0')}</span>}
            icon={CheckCheck} 
          />
          <Card 
            color="#C0E1F8" 
            title={<span className="text-[12px] font-medium">Pending Payments</span>}
            number={<span className="text-[14px]">05</span>}
            icon={DollarSign} 
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <GenericCard
            heading={<span className="text-[12px] font-medium">Client Appointments</span>}
            viewAllLink={() => navigate("/appointments")}
          >
            {appointments.length > 0 ? (
              <ClientAppointments appointments={appointments} />
            ) : (
              <EmptyState
                icon={<Phone className="w-4 h-4 text-gray-500" />}
                message={<span className="text-[11px]">No appointments scheduled</span>}
              />
            )}
          </GenericCard>
          <GenericCard
            heading={<span className="text-[12px] font-medium">Pending Appointments</span>}
            viewAllLink={() => navigate("/appointments")}
          >
            {appointments.length > 0 ? (
              <PendingAppointments appointments={pendingAppointments} />
            ) : (
              <EmptyState
                icon={<Phone className="w-4 h-4 text-gray-500" />}
                message={<span className="text-[11px]">No appointments scheduled</span>}
              />
            )}
          </GenericCard>
          <GenericCard
            heading={<span className="text-[12px] font-medium">Pending Court Filings</span>}
            viewAllLink={() => console.log("View all filings")}
          >
            {updates.length > 0 ? (
              <GenericCaseList cases={pending} pending={true} />
            ) : (
              <EmptyState
                icon={<ClipboardList className="w-4 h-4 text-gray-500" />}
                message={<span className="text-[11px]">No recent updates</span>}
              />
            )}
          </GenericCard>

          <GenericCard
            heading={<span className="text-[12px] font-medium">Recent Cases</span>}
            viewAllLink={() => navigate("/overallcases")}
          >
            {loading ? (
              <EmptyState
                icon={<ClipboardList className="w-4 h-4 text-gray-500" />}
                message={<span className="text-[11px]">Loading cases...</span>}
              />
            ) : cases && cases.length > 0 ? (
              <GenericCaseList 
                cases={cases.map(caseItem => ({
                  title: caseItem.title,
                  caseType: caseItem.caseType,
                  startingDate: new Date(caseItem.startingDate).toLocaleDateString(),
                  status: caseItem.endDate ? 'Closed' : 'Active'
                }))}
              />
            ) : (
              <EmptyState
                icon={<ClipboardList className="w-4 h-4 text-gray-500" />}
                message={<span className="text-[11px]">No recent cases</span>}
              />
            )}
          </GenericCard>
          <div className="h-[200px] overflow-y-auto col-span-2 mt-3">
            <GenericCard
              heading={<span className="text-[12px] font-medium">Court Hearings</span>}
              viewAllLink={() => navigate("/hearing")}
            >
              {hearings.length > 0 ? (
                <CourtHearingsTable hearings={hearings} />
              ) : (
                <EmptyState
                  icon={<XCircle className="w-4 h-4 text-gray-500" />}
                  message={<span className="text-[11px]">No court hearings scheduled</span>}
                />
              )}
            </GenericCard>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <GenericCard
          heading={<span className="text-[12px] font-medium">Recent Updates</span>}
          viewAllLink={() => console.log("View all recent updates")}
        >
          {updates.length > 0 ? (
            <RecentUpdatesList 
              updates={updates.map(update => ({
                ...update,
                category: <span className="text-[11px]">{update.category}</span>,
                title: <span className="text-[11px]">{update.title}</span>
              }))}
            />
          ) : (
            <EmptyState
              icon={<ClipboardList className="w-4 h-4 text-gray-500" />}
              message={<span className="text-[11px]">No recent updates</span>}
            />
          )}
        </GenericCard>

        <GenericCard
          heading={<span className="text-[12px] font-medium">Team Members</span>}
          viewAllLink={() => navigate("/profile")}
        >
          {members.length > 0 ? (
            <TeamMembersList 
              members={members.map(member => ({
                ...member,
                name: <span className="text-[11px]">{member.name}</span>
              }))} 
              onAddMember={addNewMember} 
            />
          ) : (
            <EmptyState
              icon={<XCircle className="w-4 h-4 text-gray-500" />}
              message={<span className="text-[11px]">No team members available</span>}
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
  <div className="flex justify-center items-center p-2 bg-gray-50 rounded-sm text-gray-500">
    <div className="flex items-center">
      {icon}
      <p className="text-[11px]">{message}</p>
    </div>
  </div>
);

// Recent Updates List Component
const RecentUpdatesList = ({ updates }) => (
  <div className="space-y-2">
    {updates.map((update, index) => (
      <div key={index} className="flex items-center p-1.5 bg-gray-50 rounded-sm">
        <div className="w-4 h-4 flex justify-center items-center bg-blue-100 text-blue-500 rounded-full mr-1.5">
          {update.icon && <update.icon className="w-2 h-2" />}
        </div>
        <div>
          <p className="text-[11px] text-gray-500">{update.category}</p>
          <h3 className="text-[11px] font-medium">{update.title}</h3>
        </div>
      </div>
    ))}
  </div>
);

// Team Members List Component
const TeamMembersList = ({ members, onAddMember }) => {
  console.log('Members received in TeamMembersList:', members); // Debug log
  return (
    <div className="space-y-1">
      {Array.isArray(members) && members.map((member, index) => {
        console.log('Individual member data:', member); // Debug log
        return (
          <div key={index} className="flex items-center p-1 bg-gray-50 rounded-sm hover:bg-gray-100">
            <div className="flex-1">
              <span className="text-[11px] text-gray-600">
                {member?.personalDetails?.name || 'Team Member'}
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-2 h-2" />
          </div>
        );
      })}
      
      <button
        onClick={onAddMember}
        className="w-full flex items-center justify-center gap-1 p-1 text-blue-500 hover:bg-blue-50"
      >
        <Plus className="w-2 h-2" />
        Add New Member
      </button>
    </div>
  );
};

// Court Hearings Table Component
const CourtHearingsTable = ({ hearings }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="text-[12px] text-gray-500 sticky top-0 bg-white">
        <tr>
          <th className="text-left pb-1.5 font-medium">Client Name</th>
          <th className="text-left pb-1.5 font-medium">Matter</th>
          <th className="text-left pb-1.5 font-medium">Duration</th>
          <th className="text-left pb-1.5 font-medium">Court</th>
          <th className="text-left pb-1.5 font-medium">Contact</th>
        </tr>
      </thead>
      <tbody className="text-[11px]">
        {hearings.map((hearing, index) => (
          <tr key={index} className="border-t">
            <td className="py-3">{hearing.clientName}</td>
            <td className="py-3">{hearing.matter}</td>
            <td className="py-3">{hearing.duration}</td>
            <td className="py-3">{hearing.courtName}</td>
            <td className="py-3">
              <button className="text-gray-400 hover:text-gray-600">
                <MessageCircle className="w-2 h-2" />
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
    <div className="space-y-1">
      {cases.map((caseItem, index) => (
        <div
          key={index}
          className="flex items-center p-1 bg-gray-50 rounded-sm"
        >
          <div className="flex-1">
            <p className="text-[11px] text-gray-500 mb-1">
              {caseItem.title}{" "}
              {pending && <span className="text-yellow-500">(Pending)</span>}
            </p>
            <h3 className="text-[11px] font-medium">{caseItem.timePeriod}</h3>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      ))}
    </div>
  );
};

// Pending Appointments Component
const PendingAppointments = ({ appointments }) => (
  <div className="space-y-2 bg-gray-100 rounded-sm">
    {appointments.map((appointment, index) => (
      <div key={index} className="grid gap-2.5 p-2.5 bg-gray-50 rounded-sm">
        <div className="flex flex-row items-center mb-1">
          <img
            src={appointment.clientAvatar}
            alt={appointment.clientName}
            className="w-6 h-6 rounded-full mr-1.5"
          />
          <div className="flex-1">
            <h3 className="text-[11px] font-medium">{appointment.clientName}</h3>
            <p className="text-[11px] text-gray-500">{appointment.caseType}</p>
          </div>
          <div className="flex gap-1">
            <MessageCircle className="w-2 h-2 text-gray-400" />
            <Phone className="w-2 h-2 text-gray-400" />
          </div>
        </div>

        <p className="text-[11px] text-gray-600">
          <hr className="h-[1px] bg-gray-200 border-0" />
          Appointment Request: {appointment.time}
        </p>
        <div className="flex gap-1">
          <button className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-red-50 text-red-600 rounded-sm hover:bg-red-100">
            <CircleX className="w-2 h-2" />
            <span className="text-[9px]">Reject</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-blue-50 text-blue-600 rounded-sm hover:bg-blue-100">
            <CircleCheck className="w-2 h-2" />
            <span className="text-[9px]">Accept</span>
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
    <div className="w-full bg-white rounded-sm p-3 shadow-sm">
      {/* Date Selector */}
      <div className="flex justify-between mb-4">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date.fullDate)}
            className={`flex flex-col items-center ${
              selectedDate === date.fullDate
                ? "bg-blue-600 text-white rounded-xl"
                : "text-gray-600"
            } p-1 transition-all duration-200`}
          >
            <span className="text-xs mb-1">{date.day}</span>
            <span className="text-sm font-semibold mb-1">{date.date}</span>
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
              <div className="bg-gray-50 rounded-sm p-2">
                <div className="flex items-center mb-1">
                  <img
                    src={appointment.clientAvatar}
                    alt={appointment.clientName}
                    className="w-6 h-6 rounded-full mr-1.5"
                  />
                  <div className="flex-1">
                    <h3 className="text-[11px] font-medium">
                      {appointment.clientName}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      {appointment.caseType}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button className="hover:text-blue-600">
                      <MessageCircle className="w-2 h-2 text-gray-400" />
                    </button>
                    <button className="hover:text-blue-600">
                      <Phone className="w-2 h-2 text-gray-400" />
                    </button>
                  </div>
                </div>
                <hr className=" h-[1px] bg-gray-200 border-0" />
                <div className="mt-1 pt-1 ">
                  <p className="text-[11px] text-gray-600">
                    Appointment Time: {appointment.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-4 text-gray-500">
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
