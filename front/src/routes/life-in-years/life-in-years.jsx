import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  YearsContainer,
  YearsWrapper,
  OneYearPastCircle,
  ThisYearCircle,
  OneYearFutureCircle
} from "./life-in-years.styles";
import CustomTooltip from "../../components/custom-tooltip/custom-tooltip";

const LifeInYears = ({ user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const yearOfBirth = user ? new Date(user.birthday).getFullYear() : 1997;

  const rangeOfYears = (start, end) =>
    Array(end - start + 1)
      .fill(start)
      .map((year, index) => year + index);

  const myYears = rangeOfYears(yearOfBirth, yearOfBirth + 79);

  const currentYear = new Date().getFullYear();

  const yearCircleTooltipRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseOver = (e, year, index) => {
    setTooltipVisible(false);
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + window.scrollY - 65; 

    setTooltipContent(`Year ${index + 1}: ${year}`);
    setPosition({ x: x, y: y });
    setShowTooltip(true);
  };

  const handleMouseOut = (event) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setShowTooltip(false);
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (showTooltip && yearCircleTooltipRef.current) {
        const tooltipWidth = yearCircleTooltipRef.current.offsetWidth;
        const updatedX = position.x - (tooltipWidth / 2);
        setPosition(prev => ({ ...prev, x: updatedX }));
        setTooltipVisible(true);
    }
}, [showTooltip, tooltipContent]);

  return (
    <YearsContainer>
      <h1>80 years</h1>
      <YearsWrapper>
        {myYears.map((year, i) => {
          const linkProps = {
            to: `/year/${i + 1}`
          };

          let YearCircleComponent;
          if (year < currentYear) {
            YearCircleComponent = OneYearPastCircle;
          } else if (year === currentYear) {
            YearCircleComponent = ThisYearCircle;
          } else {
            YearCircleComponent = OneYearFutureCircle;
          }

          return (
            <Link {...linkProps} key={i}>
              <YearCircleComponent
                onMouseOver={(e) => handleMouseOver(e, year, i)}
                onMouseOut={handleMouseOut}
              />
            </Link>
          );
        })}
      </YearsWrapper>
      {showTooltip && <CustomTooltip ref={yearCircleTooltipRef} content={tooltipContent} position={position} isVisible={tooltipVisible} />}
    </YearsContainer>
  );
};

export default LifeInYears;
