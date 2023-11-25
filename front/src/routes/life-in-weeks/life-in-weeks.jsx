import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  WeeksContainer,
  WeeksWrapper,
  OneWeekPastCircle,
  ThisWeekCircle,
  OneWeekFutureCircle,
  WeekLink
} from "./life-in-weeks.styles";
import CustomTooltip from '../../components/custom-tooltip/custom-tooltip';

const LifeInWeeks = ({ user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const birthDate = user ? new Date(user.birthday) : new Date("1997-08-26");
  const currentDate = new Date();
  const endDate = new Date(birthDate);
  
  endDate.setFullYear(birthDate.getFullYear() + 80);

  const totalWeeks = Math.floor((endDate - birthDate) / (7 * 24 * 60 * 60 * 1000));
  const weeksSinceBirth = Math.ceil((currentDate - birthDate) / (7 * 24 * 60 * 60 * 1000));

  const getWeekRange = (weekIndex) => {
    const weekStart = new Date(birthDate.getTime());
  
    if (weekIndex > 0) {
      weekStart.setDate(
        birthDate.getDate() +
        (7 * weekIndex) - 
        (birthDate.getDay() === 0 ? 6 : birthDate.getDay() - 1)
      );
    }
  
    const weekEnd = new Date(weekStart.getTime());
    weekEnd.setDate(weekStart.getDate() + 6);
  
    return { start: weekStart, end: weekEnd };
  };

  const formatWeekRange = (start, end) => {
    const options = { month: 'long', day: 'numeric' };
    let startDateStr = start.toLocaleDateString('en-US', options);
    let endDateStr = end.toLocaleDateString('en-US', options);

    if (start.getMonth() === end.getMonth()) {
      endDateStr = end.toLocaleDateString('en-US', { day: 'numeric' });
    }

    const yearStr = `, ${start.getFullYear()}`;
    return `${startDateStr} - ${endDateStr}${yearStr}`;
  };

  const handleMouseOver = (e, weekIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + window.scrollY;

    const { start, end } = getWeekRange(weekIndex);
    const dateRangeStr = formatWeekRange(start, end);

    setTooltipContent(`Week ${weekIndex + 1}: ${dateRangeStr}`);
    setPosition({ x: x - 125, y: y - 55 });
    setShowTooltip(true);
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

  const getWeekCircleComponent = (weekIndex) => {
    if (weekIndex < weeksSinceBirth) {
      return OneWeekPastCircle;
    } else if (weekIndex === weeksSinceBirth) { 
      return ThisWeekCircle;
    } else {
      return OneWeekFutureCircle;
    }
  };

  return (
    <WeeksContainer>
      <h1>{totalWeeks.toLocaleString('en-US')} weeks</h1>
      <WeeksWrapper>
        {Array.from({ length: totalWeeks }, (_, i) => {
          const linkProps = {
            to: `/week/${i + 1}`,
            state: { weekIndex: i + 1 },
          };

          const weekProps = {
            onMouseOver: (e) => handleMouseOver(e, i),
            onMouseOut: handleMouseOut,
          };

          const WeekCircleComponent = getWeekCircleComponent(i + 1);

          return (
            <WeekLink {...linkProps} key={i}>
              <WeekCircleComponent {...weekProps} />
            </WeekLink>
          );
        })}
      </WeeksWrapper>
      {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
    </WeeksContainer>
  );
};

export default LifeInWeeks;
