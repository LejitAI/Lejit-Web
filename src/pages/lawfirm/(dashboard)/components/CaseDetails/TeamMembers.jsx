import React from "react";
import { FiTrash2, FiPhone } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const TeamMembers = () => {
  return (
    <div className="flex flex-col gap-[16px] w-[1104px] h-[137px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-[10px] p-[20px]">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[#343434] font-medium text-[16px] leading-[24px]">
          Team Members:
        </h2>
        <button className="flex items-center gap-[6px] text-[#0F67FD] font-normal text-[14px] leading-[21px]">
          <div className="w-[24px] h-[24px] bg-[#0F67FD] flex justify-center items-center rounded-full">
            <AiOutlinePlus className="w-[14px] h-[14px] text-white" />
          </div>
          Assign Team Member
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#C7C7C7] opacity-[0.21]"></div>

      {/* Team Member Row */}
      <div className="flex justify-between items-center w-full h-[45px]">
        {/* Member Info */}
        <div className="flex items-center gap-[11px]">
          <div className="w-[40px] h-[40px] bg-cover bg-center rounded-full shadow-[0px_4px_8px_rgba(0,0,0,0.02)]" style={{ backgroundImage: "url('/path-to-profile.jpg')" }}></div>
          <div className="flex flex-col">
            <span className="text-[#343434] font-medium text-[18px] leading-[27px]">
              John Doe
            </span>
            <span className="text-[#7A7A7A] font-normal text-[12px] leading-[18px]">
              Family Dispute Case
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
    </div>
  );
};

export default TeamMembers;
