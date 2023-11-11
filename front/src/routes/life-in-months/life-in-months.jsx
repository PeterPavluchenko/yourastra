import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  MonthsContainer,
  MonthsWrapper,
  OneMonthPastCircle,
  ThisMonthCircle,
  OneMonthFutureCircle,
} from "./life-in-months.styles";
import CustomTooltip from '../../components/custom-tooltip/custom-tooltip';


const LifeInMonths = ({ user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const birthDate = user ? new Date(user.birthday) : new Date("1997-08-26");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const generateMonths = (startYear, startMonth, numMonths) => {
    let months = [];
    for (let i = 0; i < numMonths; i++) {
      let month = ((startMonth + i - 1) % 12) + 1;
      let year = startYear + Math.floor((startMonth + i - 1) / 12);
      months.push({ year, month });
    }
    return months;
  };

  let myMonths = generateMonths(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    960
  );

  const handleMouseOver = (e, month, index) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + window.scrollY;

    const monthName = new Date(month.year, month.month - 1).toLocaleString('en-US', { month: 'long' });

    setTooltipContent(`Month ${index + 1}: ${monthName} ${month.year}`);
    setPosition({ x: x - 100, y: y - 65 });
    setShowTooltip(true);
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <MonthsContainer>
      <h1>960 months</h1>
      <MonthsWrapper>
        {myMonths.map((month, i) => {
          const linkProps = {
            to: `/month/${month.year}/${month.month}`,
            state: { month: month.month, year: month.year },
          };

          const monthProps = {
            onMouseOver: (e) => handleMouseOver(e, month, i),
            onMouseOut: handleMouseOut,
          };

          let MonthCircleComponent;
          if (
            month.year < currentYear ||
            (month.year === currentYear && month.month < currentMonth)
          ) {
            MonthCircleComponent = OneMonthPastCircle;
          } else if (month.year === currentYear && month.month === currentMonth) {
            MonthCircleComponent = ThisMonthCircle;
          } else {
            MonthCircleComponent = OneMonthFutureCircle;
          }

          return (
            <Link {...linkProps} key={i}>
              <MonthCircleComponent {...monthProps} />
            </Link>
          );
        })}
      </MonthsWrapper>
      {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
    </MonthsContainer>
  );
};

export default LifeInMonths;
