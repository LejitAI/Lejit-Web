import React, { useState, useEffect } from "react";
import { FiTrash2, FiPhone } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching team members...'); // Debug log
        const response = await axios.get('http://backend.lejit.ai/backend/api/team-member/get-team-members', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('API Response:', response); // Debug log
        if (response.data) {
          console.log('API Data:', response.data); // Debug log
          setTeamMembers(Array.isArray(response.data) ? response.data : []);
        } else {
          console.error("Unexpected API response format:", response);
          setTeamMembers([]);
        }
      } catch (error) {
        console.error("Failed to fetch team members", error);
        setTeamMembers([]);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMemberClick = (member) => {
    console.log("Selected Member:", member);
    setSelectedMember(member);
  };

  const handleAssignMember = (member) => {
    setAssignedMembers([...assignedMembers, member]);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex flex-col gap-[16px] w-[1104px] h-auto bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-[10px] p-[20px]">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[#343434] font-medium text-[16px] leading-[24px]">
          Assigned Team Members:
        </h2>
        <button 
          className="flex items-center gap-[6px] text-[#0F67FD] font-normal text-[14px] leading-[21px]"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="w-[24px] h-[24px] bg-[#0F67FD] flex justify-center items-center rounded-full">
            <AiOutlinePlus className="w-[14px] h-[14px] text-white" />
          </div>
          Assign Team Member
        </button>
      </div>

      {/* Dropdown List */}
      {showDropdown && (
        <div className="absolute top-[70px] right-0 bg-white shadow-md rounded-md mt-2 w-[300px] z-10">
          {teamMembers.map((member) => (
            <div 
              key={member._id} 
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAssignMember(member)}
            >
              {member.personalDetails.name}
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#C7C7C7] opacity-[0.21]"></div>

      {/* Assigned Members List */}
      {assignedMembers.length > 0 && (
        <div>
         
          {assignedMembers.map((member) => (
            <div key={member._id} className="flex justify-between items-center w-full h-[45px] cursor-pointer" onClick={() => handleMemberClick(member)}>
              {/* Member Info */}
              <div className="flex items-center gap-[11px]">
                <div className="w-[40px] h-[40px] bg-cover bg-center rounded-full shadow-[0px_4px_8px_rgba(0,0,0,0.02)]" style={{ backgroundImage: `url(${member.personalDetails.profileImage || '/path-to-default-profile.jpg'})` }}></div>
                <div className="flex flex-col">
                  <span className="text-[#343434] font-medium text-[14px] leading-[21px]">
                    {member.personalDetails.name}
                  </span>
                  <span className="text-[#7A7A7A] font-normal text-[12px] leading-[18px]">
                    {member.professionalDetails.specialization}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-[10px]">
                <button className="w-[35px] h-[35px] flex items-center justify-center bg-white border-[2px] border-[rgba(186,186,186,0.15)] rounded-full">
                  <FiTrash2 className="text-[#7A7A7A] w-[20px] h-[20px]" />
                </button>
                <button className="w-[35px] h/[35px] flex items-center justify-center bg-white border-[2px] border-[rgba(186,186,186,0.15)] rounded-full">
                  <BsChatDots className="text-[#7A7A7A] w/[20px] h/[20px]" />
                </button>
                <button className="w/[35px] h/[35px] flex items-center justify-center bg-white border-[2px] border-[rgba(186,186,186,0.15)] rounded-full">
                  <FiPhone className="text-[#7A7A7A] w/[20px] h/[20px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
