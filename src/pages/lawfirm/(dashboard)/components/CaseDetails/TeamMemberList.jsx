import React from 'react';
import { FiTrash2, FiPhone } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

const TeamMemberList = ({ teamMembers, onMemberClick }) => {
  return (
    <div>
      {teamMembers.map((member) => (
        <div key={member._id} className="flex justify-between items-center w-full h-[45px] cursor-pointer" onClick={() => onMemberClick(member)}>
          {/* Member Info */}
          <div className="flex items-center gap-[11px]">
            <div className="w-[40px] h-[40px] bg-cover bg-center rounded-full shadow-[0px_4px_8px_rgba(0,0,0,0.02)]" style={{ backgroundImage: `url(${member.personalDetails.profileImage || '/path-to-default-profile.jpg'})` }}></div>
            <div className="flex flex-col">
              <span className="text-[#343434] font-medium text-[18px] leading-[27px]">
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
            <button className="w-[35px] h-[35px] flex items-center justify-center bg-white border-[2px] border-[rgba(186,186,186,0.15)] rounded-full">
              <BsChatDots className="text-[#7A7A7A] w-[20px] h-[20px]" />
            </button>
            <button className="w-[35px] h-[35px] flex items-center justify-center bg-white border-[2px] border-[rgba(186,186,186,0.15)] rounded-full">
              <FiPhone className="text-[#7A7A7A] w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
