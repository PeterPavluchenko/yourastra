import "./whole-universe.scss";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CustomTooltip from "../../components/custom-tooltip/custom-tooltip";

const Prehistory = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (e) => {
    if (e.target.classList.contains('main-rectangle')) {
      setTooltipContent('Last 500,000 years');
      const x = e.clientX; 
      const y = e.clientY + window.scrollY;
      
      setPosition({ x: x - 60, y: y - 60 });
      setShowTooltip(true);
    }
  };

  const handleMouseOut = (e) => {
    setShowTooltip(false);
  };

  return (
    <div>
      <Link to="/last-500-thousand-years">
        <div
          className="main-rectangle"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          data-tip="Last 500,000 years"
        >
          <Link to="/last-300-thousand-years">
            <div className="second-rectangle">
              <Link to="/last-50-thousand-years">
                <div className="third-rectangle">
                  <Link to="/last-12-thousand-years">
                    <div className="fourth-rectangle">
                      <Link to="/last-2-thousand-years">
                        <div className="fifth-rectangle"></div>
                      </Link>
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
          </Link>
        </div>
      </Link>
      {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
    </div>
  );
};

export default Prehistory;