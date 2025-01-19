import React from "react";
import { FiDownload, FiEye, FiShare2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

const FolderIcon = () => (
  <div className="relative w-[40px] h-[40px] mix-blend-luminosity">
    {/* Top part of folder */}
    <div 
      className="absolute" 
      style={{
        left: '1.67%',
        right: '1.66%',
        top: '6.68%',
        bottom: '64.99%',
        background: '#E58B0A'
      }}
    />
    {/* Middle stripe */}
    <div 
      className="absolute" 
      style={{
        left: '10%',
        right: '10%',
        top: '21.68%',
        bottom: '68.32%',
        background: '#FFFFFF'
      }}
    />
    {/* Main folder body */}
    <div 
      className="absolute" 
      style={{
        left: '1.67%',
        right: '1.66%',
        top: '30%',
        bottom: '6.67%',
        background: '#FFB90B'
      }}
    />
  </div>
);

const DocumentFolders = () => {
  const folders = [
    { name: "Court" },
    { name: "Invoice" },
    { name: "Evidence" },
    { name: "Others" },
    { name: "Opposition" },
    { name: "Quotations" }
  ];

  return (
    <div className="flex flex-col items-center p-5 gap-4 w-[1104px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-[10px]">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[16px] font-medium text-[#343434]">Case documents</h2>
        <button className="flex items-center justify-center transform rotate-180 w-[16px] h-[9px] bg-[#7A7A7A]"></button>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[rgba(29,53,87,0.1)]"></div>

      {/* Document Folders */}
      <div className="flex gap-6">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 w-[70px] h-[100px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-[50px] h-[50px] flex items-center justify-center">
              <FolderIcon />
            </div>
            <span className="text-[14px] font-medium text-[#343434] text-center">
              {folder.name}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[rgba(29,53,87,0.1)]"></div>

      {/* Document Rows */}
      {[
        { name: "March-12-03-2024.pdf", status: "Paid", color: "text-[#32B13B]", bgColor: "bg-[rgba(50,177,59,0.1)]" },
        { name: "April-12-04-2024.pdf", status: "Pending", color: "text-[#EAB000]", bgColor: "bg-[rgba(234,176,0,0.1)]" },
        { name: "May-12-04-2024.pdf", status: "Unpaid", color: "text-[#F44336]", bgColor: "bg-[rgba(244,67,54,0.1)]" },
      ].map((doc, index) => (
        <div
          key={index}
          className="flex justify-between items-center w-full py-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-[12px] h-[12px] bg-black rounded-full"></div>
            <span className="text-[14px] font-normal text-[#343434]">
              {doc.name}
            </span>
            <div
              className={`flex items-center justify-center px-2 py-1 rounded-full text-[10px] font-medium ${doc.color} ${doc.bgColor}`}
            >
              {doc.status}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiShare2 className="text-[#7A7A7A] w-[20px] h-[20px] cursor-pointer hover:text-[#0F67FD]" />
            <FiEye className="text-[#7A7A7A] w-[20px] h-[20px] cursor-pointer hover:text-[#0F67FD]" />
            <FiDownload className="text-[#7A7A7A] w-[20px] h-[20px] cursor-pointer hover:text-[#0F67FD]" />
          </div>
        </div>
      ))}

      {/* Add Document Button */}
      <div className="flex justify-end w-full">
        <button className="flex items-center gap-2 px-6 py-3 border border-[#0F67FD] rounded-[10px] text-[#0F67FD] font-medium text-[16px] hover:bg-[#0F67FD] hover:text-white transition-colors">
          <div className="w-[24px] h-[24px] bg-[#0F67FD] flex justify-center items-center rounded-full">
            <AiOutlinePlus className="w-[14px] h-[14px] text-white" />
          </div>
          ADD CASE DOCUMENTS
        </button>
      </div>
    </div>
  );
};

export default DocumentFolders;
