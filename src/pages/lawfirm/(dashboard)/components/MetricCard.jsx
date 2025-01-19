import React from "react";
import PropTypes from "prop-types";

/**
 * Card component with Tailwind CSS styling
 * @param {Object} props - Component props
 * @param {string} props.color - Background color of the card
 * @param {string} props.title - Title text for the card
 * @param {string | number} props.number - Number displayed in the card
 * @param {React.ElementType} props.icon - Icon component to render
 */
const Card = ({ color, title, number, icon: Icon }) => {
  return (
    <div
      className={`flex-1 flex  items-center pl-4 pr-11  gap-[18px] rounded-[10px]`}
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-center items-center rounded-full bg-white w-14 h-14">
        {Icon && <Icon className="w-7 h-7" />}
      </div>
      <div className="flex flex-col justify-between text-[#343434]">
        <h3 className="text-sm font-medium ">{title}</h3>
        <p className="text-[22px] font-medium">{number}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  color: PropTypes.string.isRequired, // Background color
  title: PropTypes.string.isRequired, // Card title
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Card number
  icon: PropTypes.elementType, // Icon component
};

Card.defaultProps = {
  icon: null,
};

export default Card;
