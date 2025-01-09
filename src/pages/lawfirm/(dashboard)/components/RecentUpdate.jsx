import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // For navigation to "View All"
import { ChevronRight } from "lucide-react";
const RecentUpdates = ({ heading, viewAllLink, updates }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg ">{heading}</h2>
        <button onClick={() => navigate(viewAllLink)} className="">
          View All
        </button>
      </div>

      {/* Update Cards */}
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm"
          >
            {/* Icon */}
            <div className="w-10 h-10 flex justify-center items-center bg-blue-100 text-blue-500 rounded-full mr-4">
              {update.icon && <update.icon className="w-6 h-6" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{update.category}</p>
              <h3 className="text-sm  text-gray-800">{update.title}</h3>
            </div>

            {/* Arrow */}
            <button
              onClick={() => navigate(update.detailsLink)}
              className="text-gray-400 hover:text-gray-700"
            >
              <ChevronRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentUpdates.propTypes = {
  heading: PropTypes.string.isRequired, // Heading text
  viewAllLink: PropTypes.string.isRequired, // URL for "View All"
  updates: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType, // Icon component
      category: PropTypes.string.isRequired, // Category label
      title: PropTypes.string.isRequired, // Title of the update
      detailsLink: PropTypes.string.isRequired, // URL for details
    })
  ).isRequired,
};

export default RecentUpdates;
