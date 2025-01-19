import React from "react";

const HearingSchedules = () => {
  return (
    <div className="flex flex-col p-5 gap-4 bg-white shadow-lg rounded-lg w-[1104px] h-[388px]">
      {/* Heading */}
      <div className="flex justify-between items-center w-full">
        <h3 className="font-bold text-[14px] leading-[21px] text-[#343434]">Hearing Schedules:</h3>
        <span className="font-medium text-[14px] leading-[21px] text-[#343434]">14 August 2024</span>
      </div>

      {/* Divider */}
      <div className="border-b border-[#1D3557]/10 w-full"></div>

      {/* Problem Statement */}
      <p className="text-[#343434] font-normal text-[14px] leading-[21px] w-full">
        LegalAssist is a case management system designed for law firms to efficiently handle client cases, organize
        documents, and manage workflows. The goal is to simplify the management process, reduce administrative
        overhead, and improve case tracking for lawyers. <br />
        <br />
        <strong>Problem Statement:</strong> <br />
        Law firms often struggle with disorganized case files, inefficient client communication, and difficulty tracking
        case progress. Lawyers need a system that centralizes case information, manages deadlines, and automates
        document handling to save time. <br />
        <br />
        <strong>Objective:</strong> <br />
        Design a centralized, user-friendly legal case management system that helps lawyers and legal professionals
        streamline their operations efficiently.
      </p>
    </div>
  );
};

export default HearingSchedules;
