import React from "react";

const CaseStrategies = () => {
  return (
    <div className="flex flex-col p-5 gap-4 bg-white shadow-lg rounded-lg w-[1104px] h-[345px]">
      {/* Heading */}
      <div className="flex items-center gap-3 w-[150px] h-[21px]">
        <h3 className="font-bold text-[14px] leading-[21px] text-[#343434]">Case Strategy Points</h3>
      </div>

      {/* Divider */}
      <div className="border-b border-[#1D3557]/10 w-full"></div>

      {/* Strategy Content */}
      <div className="flex flex-col gap-4 w-full h-[252px]">
        <p className="font-normal text-[12px] leading-[18px] text-[#343434]">
          LegalAssist is a case management system designed for law firms to efficiently handle client cases, organize
          documents, and manage workflows. The goal is to simplify the management process, reduce administrative
          overhead, and improve case tracking for lawyers. <br />
          <br />
          <strong>Law Points:</strong> <br />
          Law firms often struggle with disorganized case files, inefficient client communication, and difficulty
          tracking case progress. Lawyers need a system that centralizes case information, manages deadlines, and
          automates document handling. <br />
          <br />
          <strong>Strategy Points:</strong> <br />
          Law firms often struggle with disorganized case files, inefficient client communication, and difficulty
          tracking case progress. Lawyers need a system that centralizes case information, manages deadlines, and
          automates processes. <br />
          <br />
          <strong>Argument Notch:</strong> <br />
          Law firms often struggle with disorganized case files, inefficient client communication, and difficulty
          tracking case progress. Lawyers need a system that centralizes case information, manages deadlines, and
          automates document handling.
        </p>
      </div>
    </div>
  );
};

export default CaseStrategies;
