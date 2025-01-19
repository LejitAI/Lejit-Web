import React from "react";

const AdminDashboard = () => {
  const handleNavigation = (feature) => {
    if (feature === "User Management") {
      // Redirect to the Retool app link for User Management
      window.open(
        "https://lejitai2024.retool.com/apps/8d80926c-d676-11ef-a7c3-5338146f401a/Lejit%20AI/defaultPage",
        "_blank" // Opens in a new tab
      );
    } else if (feature === "Case Management") {
      // Redirect to the Retool app link for Case Management
      window.open(
        "https://lejitai2024.retool.com/apps/8d80926c-d676-11ef-a7c3-5338146f401a/Lejit%20AI/Cases",
        "_blank" // Opens in a new tab
      );
    } else if (feature === "Security") {
      // Redirect to the Retool app link for Security Logs
      window.open(
        "https://lejitai2024.retool.com/apps/8d80926c-d676-11ef-a7c3-5338146f401a/Lejit%20AI/SecurityLogs",
        "_blank" // Opens in a new tab
      );
    } else {
      // Placeholder alert for other features
      alert(`Navigate to ${feature} page or functionality!`);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-blue-800 mb-8">Admin Dashboard</h1>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* User Management */}
        <div
          className="rounded-xl shadow-lg bg-blue-100 p-6 cursor-pointer hover:bg-blue-200"
          onClick={() => handleNavigation("User Management")}
        >
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">User Management</h2>
          <p className="text-gray-700">
            Manage users, edit profiles, and control access to the platform.
          </p>
        </div>

        {/* Case Management */}
        <div
          className="rounded-xl shadow-lg bg-green-100 p-6 cursor-pointer hover:bg-green-200"
          onClick={() => handleNavigation("Case Management")}
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Case Management</h2>
          <p className="text-gray-700">
            Track and manage legal cases efficiently with detailed insights.
          </p>
        </div>

        {/* Financial Management */}
        <div
          className="rounded-xl shadow-lg bg-yellow-100 p-6 cursor-pointer hover:bg-yellow-200"
          onClick={() => handleNavigation("Financial Management")}
        >
          <h2 className="text-2xl font-semibold text-yellow-800 mb-2">Financial Management</h2>
          <p className="text-gray-700">
            Monitor earnings, payments, and generate financial reports.
          </p>
        </div>

        {/* Analytics */}
        <div
          className="rounded-xl shadow-lg bg-purple-100 p-6 cursor-pointer hover:bg-purple-200"
          onClick={() => handleNavigation("Analytics")}
        >
          <h2 className="text-2xl font-semibold text-purple-800 mb-2">Analytics</h2>
          <p className="text-gray-700">
            Gain insights into user activity and platform performance.
          </p>
        </div>

        {/* Feedback and Support */}
        <div
          className="rounded-xl shadow-lg bg-pink-100 p-6 cursor-pointer hover:bg-pink-200"
          onClick={() => handleNavigation("Feedback and Support")}
        >
          <h2 className="text-2xl font-semibold text-pink-800 mb-2">Feedback & Support</h2>
          <p className="text-gray-700">
            Access user feedback and resolve support tickets efficiently.
          </p>
        </div>

        {/* Security */}
        <div
          className="rounded-xl shadow-lg bg-red-100 p-6 cursor-pointer hover:bg-red-200"
          onClick={() => handleNavigation("Security")}
        >
          <h2 className="text-2xl font-semibold text-red-800 mb-2">Security Logs</h2>
          <p className="text-gray-700">
            Monitor activity logs and ensure the platform's safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
