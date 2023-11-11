import "./whole-universe.scss";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CustomTooltip from "../../components/custom-tooltip/custom-tooltip";

const LastDots = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (e) => {
    e.preventDefault();  
    e.stopPropagation();

    const x = e.clientX - 15; 
    const y = e.clientY + window.scrollY;

    if (e.target.classList.contains('last-dot')) {
      setTooltipContent('Last 500,000 years: Advanced tools & control of fire');
      setPosition({ x: x - 160, y: y - 60 });
      setShowTooltip(true);
    }
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className="vertical-dots">
      <div className="small-dot"></div>
      <div className="small-dot"></div>
      <div className="small-dot"></div>
      <div className="this-dot-wrapper">
        <Link to="/last-five-hundred-thousand-years">
          <div 
            className="last-dot"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            data-tip="Last 500,000 years"
          ></div>
        </Link>
      </div>
      {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
    </div>
  );
};

export default LastDots;
