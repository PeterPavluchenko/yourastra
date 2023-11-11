import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    HoursContainer,
    HoursWrapper, 
    CurrentHourCircle, 
    PastHourCircle, 
    FutureHourCircle,
    AddNewBlockButton,
    WeekBlocks,
    ArrowButton,
    TitleContainer,
    WeekDetailsContainer,
    WeekDetailsWrapper
} from './week-details.styles';
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';
import { ReactComponent as PlusIcon } from "../../../assets/plus-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";


const WeekDetails = ({ user }) => {
    const { weekIndex } = useParams();
    const navigate = useNavigate();
    
    const userBirthDate = user ? new Date(user.birthday) : new Date("1997-08-26");

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [transitionClass, setTransitionClass] = useState('');

    const getWeekRange = (index) => {
        const birthDate = new Date(userBirthDate);
        const weekStart = new Date(birthDate.getTime());
    
        if (index === 1) {
            weekStart.setDate(birthDate.getDate());
        } else {
            weekStart.setDate(birthDate.getDate() + (7 * (index - 1)) - birthDate.getDay() + 1);
        }
        weekStart.setHours(0, 0, 0, 0);

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

    const adjustedWeekIndex = parseInt(weekIndex, 10);
    const { start, end } = getWeekRange(adjustedWeekIndex);
    const dateRangeStr = formatWeekRange(start, end);

    const totalHours = 7 * 24; 
    const currentHourIndex = Math.floor((new Date() - start) / (60 * 60 * 1000));

    const formatHourRange = (hourIndex) => {
        const hourStart = new Date(start.getTime() + hourIndex * 60 * 60 * 1000);
        const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);
    
        const options = { hour: 'numeric', minute: '2-digit', hour12: false };
        let startStr = hourStart.toLocaleTimeString('en-GB', options);
        let endStr = hourEnd.toLocaleTimeString('en-GB', options);
    
        const dayOfWeek = hourStart.toLocaleDateString('en-GB', { weekday: 'long' });
    
        return `Hour ${hourIndex + 1}: ${startStr} - ${endStr}, ${dayOfWeek}`;
    };

    const handleMouseOver = (e, hourIndex) => {
        e.preventDefault();
        e.stopPropagation();

        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;

        const hourRangeStr = formatHourRange(hourIndex);
        setTooltipContent(hourRangeStr);
        setPosition({ x: x - 110, y: y - 130 });
        setShowTooltip(true);
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };

    const getHourCircleComponent = (hourIndex) => {
        if (hourIndex < currentHourIndex) {
            return PastHourCircle;
        } else if (hourIndex === currentHourIndex) {
            return CurrentHourCircle;
        } else {
            return FutureHourCircle;
        }
    };
    
    const [showButtonTooltip, setShowButtonTooltip] = useState(false);

    const handleButtonMouseOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) - 100;
        const y = rect.top - 130;

        setTooltipContent(`Add something for week ${adjustedWeekIndex}`);
        setPosition({ x, y });
        setShowButtonTooltip(true);
    };

    const handleButtonMouseOut = () => {
        setShowButtonTooltip(false);
    };

    const goToWeek = (index, direction) => {
        const exitTransitionClass = direction === 'left' ? 'exit-right' : 'exit-left';
        setTransitionClass(exitTransitionClass);
    
        setTimeout(() => {
            navigate(`/week/${index}`);
    
            const enterTransitionClass = direction === 'left' ? 'enter-right' : 'enter-left';
            setTransitionClass(enterTransitionClass);
    
            setTimeout(() => setTransitionClass(''), 300);
        }, 300);
    };
    
    const goToPreviousWeek = () => {
        if (adjustedWeekIndex > 1) {
            goToWeek(adjustedWeekIndex - 1, 'left');
        }
    };

    const goToNextWeek = () => {
        const maxWeeks = 80 * 52;
        if (adjustedWeekIndex < maxWeeks) {
            goToWeek(adjustedWeekIndex + 1, 'right');
        }
    };

    return (
        <WeekDetailsWrapper>
            <WeekDetailsContainer className={transitionClass}>
                <TitleContainer>
                    <ArrowButton onClick={goToPreviousWeek}>
                        <ArrowLeftIcon />
                    </ArrowButton>

                    <h1>Week {adjustedWeekIndex}: {dateRangeStr}</h1>

                    <ArrowButton onClick={goToNextWeek}>
                        <ArrowRightIcon />
                    </ArrowButton>
                </TitleContainer>
                <HoursContainer>
                    <HoursWrapper>
                        {Array.from({ length: totalHours }, (_, i) => {
                            const HourCircleComponent = getHourCircleComponent(i);
                            return (
                                <HourCircleComponent 
                                    key={i}
                                    onMouseOver={(e) => handleMouseOver(e, i)}
                                    onMouseOut={handleMouseOut}
                                />
                            );
                        })}
                    </HoursWrapper>
                </HoursContainer>
                <WeekBlocks>
                    <AddNewBlockButton onClick={() => {/* future functionality */}} >
                        <PlusIcon 
                            onMouseOver={handleButtonMouseOver} 
                            onMouseOut={handleButtonMouseOut}
                        />
                    </AddNewBlockButton>
                </WeekBlocks>
                {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
                {showButtonTooltip && <CustomTooltip content={tooltipContent} position={position} />}
            </WeekDetailsContainer>
        </WeekDetailsWrapper>
    );
};

export default WeekDetails;
