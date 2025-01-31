import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { useParams, useLocation } from "react-router-dom";

const CaseInfo = () => {
    const { id } = useParams();
    const location = useLocation();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0); // Timer in seconds
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const fetchCaseDetails = async () => {
            try {
                if (location.state?.caseData) {
                    setCaseData(location.state.caseData);
                    setTimer(location.state.caseData.timer || 0);
                    setIsRunning(location.state.caseData.isRunning ?? true);
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem("token");
        const response = await fetch(`http://backend.lejit.ai/backend/api/admin/get-cases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

                if (!response.ok) throw new Error("Failed to fetch case details");

                const caseDetail = await response.json();
                setCaseData(caseDetail);
                setTimer(caseDetail.timer || 0);
                setIsRunning(caseDetail.isRunning ?? true);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseDetails();
    }, [id, location.state]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleTimerToggle = async () => {
        setIsRunning((prev) => !prev);
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://backend.lejit.ai/backend/api/admin/update-case-timer/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ timer, isRunning: !isRunning }),
            });
        } catch (error) {
            console.error("Error updating timer:", error);
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, "0");
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    if (loading) return <div>Loading...</div>;
    if (!caseData) return <div>Case not found</div>;

    return (
        <div className="flex items-center justify-between w-[1104px] h-[40px]">
            {/* Page Name */}
            <div className="flex items-center gap-8">
                <button onClick={() => window.history.back()} className="text-[#343434]">
                    ←
                </button>
                <h1 className="text-[#343434] font-medium text-[22px] leading-[33px]">
                    My Case Details
                </h1>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-4">
                <div className="flex items-center px-4 py-2 bg-[#34C7591A] border border-[#34C759] rounded-[13px]">
                    <span className="text-[#34C759] font-medium text-[18px]">
                        {formatTime(timer)}
                    </span>
                </div>
                <button
                    onClick={handleTimerToggle}
                    className="text-[#0F67FD] font-medium text-[14px]"
                >
                    {isRunning ? "STOP TIMER" : "RESUME TIMER"}
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#0F67FD] rounded-[10px]">
                    <span className="text-[#0F67FD] text-[14px]">Review Document</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0F67FD] text-white rounded-[10px]">
                    <span className="text-[14px]">Create Affidavit</span>
                </button>
            </div>
        </div>
    );
};

export default CaseInfo;