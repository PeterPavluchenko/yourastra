import React, { useState } from 'react';
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

  const handleMouseOver = (e, year, index) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + window.scrollY; 

    setTooltipContent(`Year ${index + 1}: ${year}`);
    setPosition({ x: x - 50, y: y - 65 });
    setShowTooltip(true);
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

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
      {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
    </YearsContainer>
  );
};

export default LifeInYears;
