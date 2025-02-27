import PropTypes from "prop-types";

const GenericCard = ({ heading, viewAllLink, className = "", children }) => {
  return (
    <div
      className={`w-full bg-white rounded-[11px] shadow-md p-2 ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium">{heading}</h2>
        {viewAllLink && (
          <button
            onClick={() => viewAllLink()}
            className="text-blue-600 hover:text-blue-700 text-[10px]"
          >
            View All
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

// Adding PropTypes
GenericCard.propTypes = {
  heading: PropTypes.string.isRequired, // heading is required and must be a string
  viewAllLink: PropTypes.func, // viewAllLink is optional and must be a function
  className: PropTypes.string, // className is optional and must be a string
  children: PropTypes.node.isRequired, // children is required and must be a valid React node
};

export default GenericCard;
