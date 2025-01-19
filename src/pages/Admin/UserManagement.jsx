import React from "react";

const UserManagement = () => {
  const handleRedirect = () => {
    // Replace with your Retool app URL
    const retoolUrl =
      "https://lejitai2024.retool.com/apps/8d80926c-d676-11ef-a7c3-5338146f401a/Lejit%20AI/defaultPage";
    window.open(retoolUrl, "_blank"); // Open in a new tab
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 p-4 hover:bg-blue-200 cursor-pointer"
      onClick={handleRedirect}
    >
      <h2 className="font-bold text-xl mb-2 text-blue-800">User Management</h2>
      <p className="text-gray-700">Manage users, edit profiles, and control access.</p>
    </div>
  );
};

export default UserManagement;
