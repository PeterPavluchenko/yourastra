import "./whole-universe.scss";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CustomTooltip from "../../components/custom-tooltip/custom-tooltip";

const Prehistory = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseOver = (e, elementName) => {
    e.preventDefault();  
    e.stopPropagation();
    setHoveredElement(elementName); 

    const x = e.clientX; 
    const y = e.clientY + window.scrollY;

    if (e.target.classList.contains('main-rectangle')) {
      setTooltipContent('500,000 years: Advanced tools & control of fire');

      setPosition({ x: x - 160, y: y - 60 });
      setShowTooltip(true);
    } else if (e.target.classList.contains('second-rectangle')) {
      setTooltipContent('300,000 years: Anatomically modern humans');

      setPosition({ x: x - 160, y: y - 60 });
      setShowTooltip(true);
    } else if (e.target.classList.contains('third-rectangle')) {
      setTooltipContent('50,000 years: Behaviorally modern humans');

      setPosition({ x: x - 150, y: y - 60 });
      setShowTooltip(true);
    } else if (e.target.classList.contains('fourth-rectangle')) {
      setTooltipContent('12,000 years: Birth of agriculture & civilization');

      setPosition({ x: x - 160, y: y - 60 });
      setShowTooltip(true);
    } else if (e.target.classList.contains('fifth-rectangle')) {
      setTooltipContent('2,000 years: Rise of global religions & empires');

      setPosition({ x: x - 160, y: y - 60 });
      setShowTooltip(true);
    }
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredElement(null);
    setShowTooltip(false);
  };

  return (
    <div>
      <Link to="/last-five-hundred-thousand-years">
        <div
          className={`main-rectangle ${hoveredElement === 'main-rectangle' ? 'main-rectangle-hovered' : ''}`}
          onMouseOver={(e) => handleMouseOver(e, 'main-rectangle')}
          onMouseOut={handleMouseOut}
          data-tip="Last 500,000 years"
        >
          <Link to="/last-300-thousand-years">
            <div 
              className={`second-rectangle ${hoveredElement === 'second-rectangle' ? 'second-rectangle-hovered' : ''}`}
              onMouseOver={(e) => handleMouseOver(e, 'second-rectangle')}
              onMouseOut={handleMouseOut} 
              data-tip="Last 300,000 years: Anatomically modern humans"
            >
              <Link to="/last-50-thousand-years">
                <div 
                  className={`third-rectangle ${hoveredElement === 'third-rectangle' ? 'third-rectangle-hovered' : ''}`}
                  onMouseOver={(e) => handleMouseOver(e, 'third-rectangle')}
                  onMouseOut={handleMouseOut} 
                  data-tip="50,000 years: Behaviorally modern humans"
                >
                  <Link to="/last-12-thousand-years">
                    <div 
                      className={`fourth-rectangle ${hoveredElement === 'fourth-rectangle' ? 'fourth-rectangle-hovered' : ''}`}
                      onMouseOver={(e) => handleMouseOver(e, 'fourth-rectangle')}
                      onMouseOut={handleMouseOut} 
                      data-tip="12,000 years: Birth of agriculture & civilization"
                    >
                      <Link to="/last-2-thousand-years">
                        <div 
                          className={`fifth-rectangle ${hoveredElement === 'fifth-rectangle' ? 'fifth-rectangle-hovered' : ''}`}
                          onMouseOver={(e) => handleMouseOver(e, 'fifth-rectangle')}
                          onMouseOut={handleMouseOut} 
                          data-tip="2,000 years: Rise of global religions & empires"
                        ></div>
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