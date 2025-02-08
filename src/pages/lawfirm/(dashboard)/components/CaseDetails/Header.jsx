import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

// ✅ Clockify API Credentials
const CLOCKIFY_API_KEY = "YTNlOGNlOWYtNTI0Mi00MGZjLWE2YTMtYzRmZmYzNmFkMjBh"; // Replace with your actual Clockify API key
const WORKSPACE_ID = "679f603a8800be069d1ea044"; // Replace with your Clockify Workspace ID
const USER_ID = "679f603a8800be069d1ea043"; // Replace with your Clockify user ID

const CaseInfo = () => {
    const { id } = useParams();
    const location = useLocation();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeEntryId, setTimeEntryId] = useState(null);

    useEffect(() => {
        const fetchCaseDetails = async () => {
            try {
                if (location.state?.caseData) {
                    setCaseData(location.state.caseData);
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem("token");
                const response = await fetch(`http://backend.lejit.ai/backend/api/case/get-case/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch case details");

                const caseDetail = await response.json();
                setCaseData(caseDetail);
                setLoading(false);

                fetchClockifyTime();
            } catch (error) {
                console.error("❌ Error fetching case details:", error);
                setLoading(false);
            }
        };

        fetchCaseDetails();
    }, [id, location.state]);

    // ✅ Fetch active Clockify time entries and calculate elapsed time
    const fetchClockifyTime = async () => {
        try {
            console.log("🔄 Fetching Clockify time entries...");
            const response = await axios.get(
                `https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/user/${USER_ID}/time-entries`,
                {
                    headers: {
                        "X-Api-Key": CLOCKIFY_API_KEY
                    },
                }
            );

            console.log("✅ Clockify API Response:", response.data);

            // Find an active time entry (where `end` is null)
            const currentEntry = response.data.find(entry => entry.timeInterval.end === null);

            if (currentEntry) {
                console.log("🎯 Found active Clockify time entry:", currentEntry);
                setTimeEntryId(currentEntry.id);
                setIsRunning(true);

                // ✅ Calculate elapsed time and start updating UI
                const startTime = moment(currentEntry.timeInterval.start);
                const elapsedSeconds = moment().diff(startTime, 'seconds');
                setTimer(elapsedSeconds); // Set correct elapsed time

            } else {
                console.log("⚠️ No active Clockify time entry found.");
                setTimeEntryId(null);
                setIsRunning(false);
                setTimer(0); // Reset to 0 only when no timer is running
            }
        } catch (error) {
            console.error("❌ Error fetching Clockify time:", error);
        }
    };

    // ✅ Live update timer every second
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleTimerToggle = async () => {
        console.log("⏳ Timer button clicked. Current state:", { isRunning, timeEntryId });

        if (isRunning) {
            console.log("🛑 Stopping timer...");
            await stopClockifyTimer();
        } else {
            console.log("▶️ Starting timer...");
            await startClockifyTimer();
        }
    };

    // ✅ Start Timer in Clockify
    const startClockifyTimer = async () => {
        try {
            console.log("⏳ Sending request to start timer in Clockify...");

            const response = await axios.post(
                `https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/time-entries`,
                {
                    start: moment().toISOString(),
                    billable: true,
                    description: `Case ${id} - Tracking Time`,
                    userId: USER_ID
                },
                {
                    headers: {
                        "X-Api-Key": CLOCKIFY_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Timer started successfully in Clockify:", response.data);

            setTimeEntryId(response.data.id);
            setIsRunning(true);
            setTimer(0); // Reset timer only when a new session starts
        } catch (error) {
            console.error("❌ Error starting timer in Clockify:", error);
        }
    };

    // ✅ Stop Timer in Clockify
    const stopClockifyTimer = async () => {
        if (!timeEntryId) {
            console.log("⚠️ No active time entry found. Cannot stop.");
            return;
        }

        console.log("🛑 Stopping timer for Entry ID:", timeEntryId);

        try {
            const response = await axios.patch(
                `https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/time-entries/${timeEntryId}`,
                {
                    end: moment().toISOString()
                },
                {
                    headers: {
                        "X-Api-Key": CLOCKIFY_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Timer stopped successfully:", response.data);
            setIsRunning(false);
        } catch (error) {
            console.error("❌ Error stopping timer in Clockify:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!caseData) return <div>Case not found</div>;

    return (
        <div className="flex items-center justify-between w-[1104px] h-[40px]">
            <h1 className="text-[#343434] font-medium text-[22px] leading-[33px]">My Case Details</h1>
            <div className="flex items-center gap-4">
                {/* ✅ Display persistent live timer */}
                <div className="flex items-center px-4 py-2 bg-[#34C7591A] border border-[#34C759] rounded-[13px]">
                    <span className="text-[#34C759] font-medium text-[18px]">
                        {moment.utc(timer * 1000).format("HH:mm:ss")}
                    </span>
                </div>
                {/* Start/Stop Timer Button */}
                <button onClick={handleTimerToggle} className="text-[#0F67FD] font-medium text-[14px]">
                    {isRunning ? "STOP TIMER" : "START TIMER"}
                </button>
            </div>
        </div>
    );
};

export default CaseInfo;
