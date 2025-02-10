import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const CaseInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        // First try to use data passed through navigation
        if (location.state?.caseData) {
          setCaseData(location.state.caseData);
          setLoading(false);
          return;
        }

        // If no data in navigation state, fetch from API
        const token = localStorage.getItem("token");
        const response = await fetch(`http://app.lejit.ai/backend/api/admin/get-cases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch case details');

        const cases = await response.json();
        const currentCase = cases.find(c => c._id === id);
        
        if (!currentCase) throw new Error('Case not found');
        
        setCaseData(currentCase);
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id, location.state]);

  if (loading) return <div>Loading...</div>;
  if (!caseData) return <div>Case not found</div>;

  const startDate = new Date(caseData.startingDate);

  return (
    <div className="flex items-center gap-[20px] w-[1064px] h-[74px]">
      {/* Date Section */}
      <div className="flex flex-col items-center justify-center w-[56px] h-[56px] bg-[#EEF4FF] border-[2.5px] border-[#0F67FD] shadow-[0px_10px_60px_rgba(0,0,0,0.1)] rounded-[13px]">
        <span className="text-[#0F67FD] font-medium text-[18px] leading-[27px]">
          {startDate.getDate()}
        </span>
        <span className="text-[#0F67FD] font-bold text-[12px] leading-[18px]">
          {startDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
        </span>
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-[4px] w-[704px] h-[74px]">
        {/* Case Name */}
        <h1 className="text-[#343434] font-medium text-[16px] leading-[24px]">
          {caseData.title}
        </h1>

        {/* Client Name and Case Type */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[#7A7A7A] font-normal text-[12px] leading-[18px]">
              Client Name:
            </span>
            <span className="text-[#343434] font-normal text-[12px] leading-[18px]">
              {caseData.client}
            </span>
          </div>
          <span className="w-[17px] h-[1px] bg-[rgba(0,0,0,0.2)] rotate-[90deg]"></span>
          <div className="flex items-center gap-[4px]">
            <span className="text-[#7A7A7A] font-normal text-[12px] leading-[18px]">
              Case Type:
            </span>
            <span className="text-[#343434] font-normal text-[12px] leading-[18px]">
              {caseData.caseType}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-[8px] bg-transparent w-[200px] h-[24px]">
          <div className="w-[10px] h-[10px] bg-[#0F67FD] rounded-full"></div>
          <span className="text-[#0F67FD] font-semibold text-[12px] leading-[16px]">
            {caseData.status || 'Ongoing'}
          </span>
        </div>
      </div>

      {/* Client Actions */}
      <div className="flex items-center justify-end gap-[14px] w-[264px] h-[40px]">
        <span className="text-[#343434] font-normal text-[12px] leading-[18px]">
          Connect Client:
        </span>
        <button className="flex items-center justify-center w-[40px] h-[40px] bg-[#EEF4FF] rounded-full">
          <FiMessageCircle className="text-[#343434] w-[24px] h-[24px]" />
        </button>
        <button className="flex items-center justify-center w-[40px] h-[40px] bg-[#EEF4FF] rounded-full">
          <FiPhone className="text-[#343434] w-[24px] h-[24px]" />
        </button>
        <button className="flex items-center justify-center w-[40px] h-[40px] bg-[#EEF4FF] rounded-full">
          <FaWhatsapp className="text-[#343434] w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default CaseInfo;
