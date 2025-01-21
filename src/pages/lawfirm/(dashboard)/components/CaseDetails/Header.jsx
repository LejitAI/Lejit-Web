import React from "react";
import { FiDownload } from "react-icons/fi"; // For Download Icon
import { AiOutlinePlus } from "react-icons/ai"; // For Plus Icon

const Header = () => {
  return (
    <div className="flex justify-between items-center w-[1104px] h-[40px] px-0">
      {/* Left Section - Page Title */}
      <div className="flex items-center gap-[8px]">
        {/* Back Button */}
        <button className="relative w-[20px] h-[20px] flex justify-center items-center">
          <div className="absolute w-[18px] h-[16px]">
            <span
              className="absolute left-[5%] right-[5%] top-[50%] bottom-[50%] border-l-2 border-[#343434] rotate-45"
              style={{ transformOrigin: "center" }}
            ></span>
          </div>
        </button>
        {/* Page Title */}
        <h1 className="text-[#343434] font-medium text-[22px] leading-[33px]">
          My Case Details
        </h1>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center gap-[25px]">
        {/* Review Document Button */}
        <button className="flex items-center gap-[6px] border border-[#0F67FD] rounded-[10px] px-[16px] h-[40px]">
          <div className="w-[24px] h-[24px] bg-[#0F67FD] flex justify-center items-center rounded-full">
            <FiDownload className="w-[14px] h-[14px] text-white" />
          </div>
          <span className="text-[#0F67FD] font-normal text-[14px] leading-[21px]">
            Review Document
          </span>
        </button>

        {/* Create Affidavit Button */}
        <button className="flex items-center gap-[6px] bg-[#0F67FD] text-white rounded-[10px] px-[16px] h-[40px]">
          <div className="w-[24px] h-[24px] bg-white flex justify-center items-center rounded-full">
            <AiOutlinePlus className="w-[14px] h-[14px] text-[#0F67FD]" />
          </div>
          <span className="font-normal text-[14px] leading-[21px]">
            Create Affidavit
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
