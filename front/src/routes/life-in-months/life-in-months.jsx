import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  MonthsContainer,
  MonthsWrapper,
  OneMonthPastCircle,
  ThisMonthCircle,
  OneMonthFutureCircle,
  MonthLink
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

  const monthCircleTooltipRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseOver = (e, month, index) => {
    setTooltipVisible(false);
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + window.scrollY - 65;

    const monthName = new Date(month.year, month.month - 1).toLocaleString('en-US', { month: 'long' });

    setTooltipContent(`Month ${index + 1}: ${monthName} ${month.year}`);
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
    if (showTooltip && monthCircleTooltipRef.current) {
        const tooltipWidth = monthCircleTooltipRef.current.offsetWidth;
        const updatedX = position.x - (tooltipWidth / 2);
        setPosition(prev => ({ ...prev, x: updatedX }));
        setTooltipVisible(true);
    }
}, [showTooltip, tooltipContent]);

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
            <MonthLink {...linkProps} key={i}>
              <MonthCircleComponent {...monthProps} />
            </MonthLink>
          );
        })}
      </MonthsWrapper>
      {showTooltip && <CustomTooltip ref={monthCircleTooltipRef} content={tooltipContent} position={position} isVisible={tooltipVisible} />}
    </MonthsContainer>
  );
};

export default LifeInMonths;
