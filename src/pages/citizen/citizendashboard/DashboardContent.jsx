import React, { useState } from "react";

import PropTypes from "prop-types";
import Slider from "react-slick";
import { FileText } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs, Tab, Breadcrumbs } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GavelIcon from "@mui/icons-material/Gavel";
import BusinessIcon from "@mui/icons-material/Business";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Search, Sparkles, Command } from "lucide-react";
import Card from "../../lawfirm/(dashboard)/components/MetricCard";
import {
  MessageCircle,
  PartyPopper,
  ClipboardList,
  BriefcaseBusiness,
  X,
  MapPin,
  Award,
  CircleX,
  CircleCheck,
  User,
} from "lucide-react";
import { Calendar, ChevronRight, Plus, Phone, XCircle } from "lucide-react";
import { FaFolder, FaCalendar, FaTrophy } from "react-icons/fa";
import { Star } from "lucide-react";

import AskAI from "../../lawfirm/global/AskAI";
import GenericCard from "../../lawfirm/(dashboard)/components/GenericCard";

const randomAvatar =
  "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/92/92f6386ba5544c151dbce85dd4b42dafa510eeea.jpg";
const categories = [
  { label: "Corporate", icon: <CorporateFareIcon /> },
  { label: "Family", icon: <FamilyRestroomIcon /> },
  { label: "Divorce", icon: <FavoriteIcon /> },
  { label: "Criminal Defence", icon: <GavelIcon /> },
  { label: "Commercial", icon: <BusinessIcon /> },
];

const CDashboard = () => {
  const [isFocused, setIsFocused] = useState(false);
  // Use useState to manage dynamic data
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const lawyersByCategories = [
    {
      name: "Smith Davis",
      location: "Austin",
      specialization: "Corporate",
      experience: "8 Years Experience",
      rating: 3.2,
      image: randomAvatar,
    },
    {
      name: "Will Damon",
      location: "New York",
      specialization: "Corporate",
      experience: "6 Years Experience",
      rating: 3.2,
      image: randomAvatar,
    },
  ];

  const nearbyLawyers = [
    {
      name: "Steve Haworth",
      location: "0.2 km away",
      specialization: "Family",
      experience: "8 Years",
      cases: "120+",
      rating: 4.2,
      image: randomAvatar,
    },
    {
      name: "Sora Haworth",
      location: "10 km away",
      specialization: "Family",
      experience: "8 Years",
      cases: "500+",
      rating: 4.5,
      image: randomAvatar,
    },
    {
      name: "Smith Davis",
      location: "Austin",
      specialization: "Criminal Defence",
      experience: "8 Years",
      cases: "500+",
      rating: 4.7,
      image: randomAvatar,
    },
  ];
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

  const [members, setMembers] = useState([
    {
      name: "John Doe",
      role: "Senior Attorney",
      avatar: randomAvatar,
    },
    {
      name: "Jane Smith",
      role: "Junior Attorney",
      avatar: randomAvatar,
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

  return (
    <div className="h-[calc(100vh-110px)]  grid grid-cols-[70%_30%] gap-4">
      <div className="h-[calc(100vh-110px-50px)] bg grid grid-rows-[20%_80%] gap-4">
        <div className="flex flex-col gap-4">
          <span>
            <p className="text-lg font-semibold">Hi, John</p>
            <p className="text-base text-gray-600">Welcome Back!</p>
          </span>
          <CaseDocumentsCard />
        </div>
        <div className="flex flex-col  rounded-lg shadow-md p-4 border gap-4">
          <SectionHeader
            title="Lawyers By Categories"
            viewAll="View All Lawyers"
          />
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={category.label}
                icon={category.icon}
                iconPosition="start"
                className={selectedTab === index ? "text-blue-500" : ""}
              />
            ))}
          </Tabs>

          {/* Lawyers By Categories */}

          <div className="space-y-4">
            <ProfileCard
              name="Smith Davis"
              location="Austin"
              category="Corporate"
              rating={3.2}
              experience="8"
              imageUrl={randomAvatar}
            />

            <ProfileCard
              name="Smith Davis"
              location="Austin"
              category="Corporate"
              rating={3.2}
              experience="8"
              imageUrl={randomAvatar}
            />
          </div>

          {/* Nearby Lawyers */}
          <SectionHeader title="Nearby Lawyers" viewAll />
          <div className="grid grid-cols-2 gap-5 overflow-auto ">
            <ProfileCard2
              name="Smith Davis"
              location="Austin"
              category="Corporate"
              rating={3.2}
              experience="8"
              imageUrl={randomAvatar}
            />

            <ProfileCard2
              name="Steve Worth"
              rating={4.2}
              experience="8"
              distance="0.2"
              casesCount="120+"
              isFamily={true}
              imageUrl={randomAvatar}
            />
            <ProfileCard2
              name="Steve Worth"
              rating={4.2}
              experience="8"
              distance="0.2"
              casesCount="120+"
              isFamily={true}
              imageUrl={randomAvatar}
            />
            <ProfileCard2
              name="Steve Worth"
              rating={4.2}
              experience="8"
              distance="0.2"
              casesCount="120+"
              isFamily={true}
              imageUrl={randomAvatar}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        {" "}
        <GenericCard
          heading="Recent Updates"
          viewAllLink={() => console.log("View all updates")}
        >
          <div className="overflow-auto">
            {updates.length > 0 ? (
              <RecentUpdatesList updates={updates} />
            ) : (
              <EmptyState
                icon={<ClipboardList />}
                message="No recent updates"
              />
            )}
          </div>
        </GenericCard>
        <GenericCard
          heading="Team Members"
          viewAllLink={() => console.log("View all members")}
        >
          <div className="">
            {members.length > 0 ? (
              <TeamMembersList members={members} onAddMember={addNewMember} />
            ) : (
              <EmptyState
                icon={<XCircle />}
                message="No team members available"
              />
            )}
          </div>
        </GenericCard>
        <div className="flex-1">
          {/* <AskAI /> */}
          <div className="z-50">
            <div
              className={`
          flex items-center gap-2 
          bg-white border-2 rounded-full
          shadow-lg hover:shadow-xl
          w-full  
          transition-all duration-300 ease-in-out
          ${
            isFocused
              ? " border-blue-600 shadow-blue-100"
              : " border-blue-300 hover:border-gray-300"
          }
        `}
            >
              {/* Search Icon with Sparkle Effect */}
              <div className="relative p-2">
                <Search
                  size={20}
                  className={`
              transition-colors duration-300
              ${isFocused ? "text-blue-500" : "text-gray-400"}
            `}
                />
                <Sparkles
                  size={12}
                  className={`
              absolute -top-1 -right-1
              text-yellow-400
              animate-pulse
            `}
                />
              </div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Ask AI for help..."
                className="flex-1 py-2 pr-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              {/* Keyboard Shortcut */}
              <div className="mr-3 flex items-center gap-1 text-xs text-gray-400">
                <Command size={14} />
                <span>K</span>
              </div>
            </div>

            {/* Pulsing Background Effect */}
            <div
              className={`
        absolute inset-0 -z-10
        bg-blue-100 rounded-full
        transition-transform duration-700
        ${isFocused ? "scale-110 animate-pulse" : "scale-0"}
      `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDashboard;

// Empty State Component
const EmptyState = ({ icon, message }) => (
  <div className="flex justify-center items-center p-6 bg-gray-50 rounded-lg text-gray-500 ">
    <div className=" flex items-center">
      {icon}
      <p>{message}</p>
    </div>
  </div>
);
//prepare case document
const CaseDocumentsCard = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200 cursor-pointer w-full ">
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Prepare Case Documents
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Prepare your case documents with the help of ChatGPT and get a
              list of lawyers who can assist with your case.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
      </div>
    </div>
  );
};

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
const TeamMembersList = ({ members, onAddMember }) => (
  <div className="space-y-3">
    <CaseCard
      date="14"
      month="TUE"
      title="High court divorce case"
      lawyerName="Steve Haworth"
      lawyerFirm="AIB Professional Firm"
      status="Upcoming"
    />

    <CaseCard
      date="14"
      month="TUE"
      title="High court divorce case"
      lawyerName="Steve Haworth"
      lawyerFirm="AIB Professional Firm"
      status="Missed"
      attachments={["Property Document.pdf", "Proof.pdf", "Licence.pdf"]}
    />
  </div>
);

// Court Hearings Table Component

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

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{lawyer.name}</h3>
          <p className="text-sm text-gray-500">{lawyer.location}</p>
          <p className="text-sm text-gray-500">{lawyer.specialization}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-blue-500 font-medium">{lawyer.experience}</span>
        <p className="text-sm text-yellow-500">⭐ {lawyer.rating}</p>
      </div>
    </div>
  );
};
const ExperienceBadge = ({ years, label }) => {
  return (
    <div className="bg-blue-50 px-3 pb-3 rounded-xl max-w-xs flex items-center gap-6 ">
      <div className="bg-red-200 p-3 rounded-b-lg  top-2">
        <Award size={24} className="text-pink-400" />
      </div>
      <div className="">
        <h2 className="text-lg font-semibold text-gray-800">{years} Years</h2>
        <p className="text-md text-gray-600">{label}</p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, viewAll }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      {viewAll && (
        <a className="text-blue-500 text-sm" href={viewAll}>
          View All
        </a>
      )}
    </div>
  );
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center px-1 bg-gray-100 w-fit rounded-md">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-blue-600">{rating}</span>
    </div>
  );
};

const ProfileCard = ({
  name,
  location,
  category,
  rating,
  experience,
  imageUrl,
  distance,
  casesCount,
  isFamily,
}) => {
  return (
    <div className="w-full grid grid-cols-[15%_85%] rounded-lg border p-4 shadow-sm">
      <img
        src={imageUrl || "/api/placeholder/64/64"}
        alt={name}
        className="h-28 w-28 rounded-lg"
      />

      <div className="flex justify-between ">
        <div className="flex flex-col justify-around ">
          <h3 className="text-lg font-semibold text-gray-900">
            {name}
            {isFamily && (
              <span className="ml-2 text-sm text-gray-500">(Family)</span>
            )}
          </h3>

          {(location || category) && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {location && (
                <span className="flex items-center text-blue-600">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
              {category && (
                <>
                  <BriefcaseBusiness className="h-4 w-4" />

                  <span>{category}</span>
                </>
              )}
            </div>
          )}
          <StarRating rating={rating} />

          {(distance || casesCount) && (
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              {distance && <span>{distance} km away</span>}
              {casesCount && <span>Cases Solved: {casesCount}</span>}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-around items-end gap-2 ">
          <ExperienceBadge years={8} label="Experience" />
          <div className="flex gap-2">
            <button className="rounded-full p-2  border-2  text-gray-500 hover:bg-gray-100">
              <MessageCircle size={20} />
            </button>
            <button className="rounded-full p-2  border-2  text-gray-500 hover:bg-gray-100">
              <Phone size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard2 = ({
  name,
  location,
  category,
  rating,
  experience,
  imageUrl,
  distance,
  casesCount,
  isFamily,
}) => {
  return (
    <div className=" rounded-lg border border-blue-100 bg-white  h-[120px] ">
      <div className="flex gap-4 relative">
        {/* Image container with diagonal pattern overlay */}
        <div className="relative min-w-[120px] h-[120px]">
          <img
            src={randomAvatar}
            alt="Profile"
            className="w-[120px] h-[120px] object-cover rounded-l-lg"
          />
          <div className=" inset-0 bg-gradient-to-r from-pink-500/20 to-transparent rounded-lg" />
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between ">
          {/* Rating */}
          <StarRating rating={rating} />
          {/* Name and type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {name}
              <span className="text-gray-500">
                {category && `(${category})`}
              </span>
            </h3>
          </div>
          {/* Experience and location */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Exp. -{experience} yrs</span>

            <span>|</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-blue-500" />
              <span>{distance} km away</span>
            </div>
          </div>
          {/* Cases */}
          <div className="text-sm text-gray-600">
            Cases Solved - {casesCount}+
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseCard = ({
  date,
  month,
  title,
  lawyerName,
  lawyerFirm,
  status,
  attachments = [],
}) => {
  const isMissed = status === "Missed";

  return (
    <div className="border rounded-lg p-2 bg-white shadow-sm  flex flex-col gap-2">
      <div className=" flex gap-4">
        {/* Date Box */}
        <div
          className={`min-w-14 h-14 border-2 rounded-lg flex flex-col items-center justify-center ${
            isMissed
              ? "border-red-500 text-red-500"
              : "border-blue-500 text-blue-500"
          }`}
        >
          <span className="text-3xl font-bold">{date}</span>
          <span className="text-sm font-semibold uppercase">{month}</span>
        </div>
        {/* Content */}
        <div className="flex flex-col font-normal">
          <h1 className="text-md">{title}</h1>

          <div className="flex">
            <span className="w-32 text-gray-500">Lawyer Name:</span>
            <span className="font-medium text-gray-800">{lawyerName}</span>
          </div>

          <div className="flex items-center">
            <span className="w-32 text-gray-500">Lawyer Firm:</span>
            <span className="font-medium text-gray-800">{lawyerFirm}</span>
          </div>
          {status && (
            <span
              className={` px-3 py-1 text-sm font-medium rounded-full w-fit ${
                isMissed ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50"
              }`}
            >
              {status}
            </span>
          )}
        </div>{" "}
      </div>

      {/* Attachments Section - Only rendered if attachments exist */}
      {attachments.length > 0 && (
        <>
          <hr />
          <div className="flex flex-wrap gap-4">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                <FileText size={12} />
                <span className="truncate text-[10px]">{file}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
