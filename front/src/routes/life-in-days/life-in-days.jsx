import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  DaysContainer,
  DaysWrapper,
  OneDayPastCircle,
  ThisDayCircle,
  OneDayFutureCircle,
  DayLink,
  DayPlaceholder
} from "./life-in-days.styles";
import CustomTooltip from '../../components/custom-tooltip/custom-tooltip';

const LifeInDays = ({ user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(null);

  const birthDate = user ? new Date(user.birthday) : new Date("1997-08-26");
  const endOfLifeDate = new Date(birthDate);
  endOfLifeDate.setFullYear(birthDate.getFullYear() + 80);
  const currentDate = new Date();

  const daysSinceBirth = Math.floor(
    (currentDate - birthDate) / (24 * 60 * 60 * 1000)
  );

  const totalDays = Math.floor(
    (endOfLifeDate - birthDate) / (24 * 60 * 60 * 1000)
  );

  const generateDays = () => {
    let days = [];
    for (let i = 0; i < totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  let myDays = generateDays();

  const handleSectionMouseOver = (sectionIndex) => {
    setActiveSection(sectionIndex);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const dayCircleTooltipRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseOver = (e, dayIndex) => {
    setTooltipVisible(false);
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + window.scrollY - 50;

    const dayDate = new Date(birthDate);
    dayDate.setDate(birthDate.getDate() + dayIndex);

    setTooltipContent(`Day ${dayIndex + 1}: ${formatDate(dayDate)}`);
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
    if (showTooltip && dayCircleTooltipRef.current && !tooltipVisible) {
        const tooltipWidth = dayCircleTooltipRef.current.offsetWidth;
        const updatedX = position.x - (tooltipWidth / 2);
        setPosition(prev => ({ ...prev, x: updatedX }));
        setTooltipVisible(true);
    }
  }, [showTooltip, tooltipContent]);

  const getDayCircleComponent = (dayIndex, isInteractive) => {
    let type = 'future';
    if (dayIndex < daysSinceBirth) {
      type = 'past';
    } else if (dayIndex === daysSinceBirth) {
      type = 'present';
    }
  
    if (!isInteractive) {
      return <DayPlaceholder type={type} key={dayIndex} onMouseOver={() => handleSectionMouseOver(Math.floor(dayIndex / 260))} />;
    }
  
    if (type === 'past') {
      return OneDayPastCircle;
    } else if (type === 'present') {
      return ThisDayCircle;
    } else {
      return OneDayFutureCircle;
    }
  };

  return (
    <DaysContainer>
      <h1>{totalDays.toLocaleString('en-US')} days</h1>
      <DaysWrapper>
        {myDays.map((day, i) => {
          const isInteractive = Math.floor(i / 260) === activeSection;

          const DayCircleComponent = getDayCircleComponent(i, isInteractive);
          const circleProps = isInteractive ? {
            onMouseOver: (e) => handleMouseOver(e, i),
            onMouseOut: handleMouseOut
          } : {};

          return isInteractive ? (
            <DayLink 
              to={`/day/${i + 1}`}
              state={{ dayIndex: i + 1 }}
              key={i}
              {...circleProps}>
              <DayCircleComponent />
            </DayLink>
          ) : DayCircleComponent;
        })}
      </DaysWrapper>
      {showTooltip && <CustomTooltip ref={dayCircleTooltipRef} content={tooltipContent} position={position} isVisible={tooltipVisible} />}
    </DaysContainer>
  );
};

export default LifeInDays;
