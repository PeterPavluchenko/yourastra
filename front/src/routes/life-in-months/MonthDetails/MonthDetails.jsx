import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowButton, TitleContainer } from '../../life-in-days/DayDetails/day-details.styles';
import { 
    HoursContainer,
    HoursWrapper,
    PastHourCircle,
    CurrentHourCircle,
    FutureHourCircle,
    MonthDetailsContainer, 
    MonthDetailsWrapper 
} from './month-details.styles';
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';

const MonthDetails = ({ user }) => {
    const { year, month } = useParams();
    const navigate = useNavigate();

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [transitionClass, setTransitionClass] = useState('');

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    };

    const calculateMonthIndex = (year, month) => {
        const birthDate = user ? new Date(user.birthday) : new Date("1997-08-26");
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth() + 1;

        return (year - birthYear) * 12 + (month - birthMonth) + 1;
    };

    const monthName = getMonthName(month);
    const monthIndex = calculateMonthIndex(parseInt(year), parseInt(month));

    const goToPreviousMonth = () => {
        const exitTransitionClass = 'exit-right';
        setTransitionClass(exitTransitionClass);
    
        setTimeout(() => {
            let prevYear = parseInt(year);
            let prevMonth = parseInt(month) - 1;
            if (prevMonth < 1) {
                prevYear -= 1;
                prevMonth = 12;
            }
            navigate(`/month/${prevYear}/${prevMonth}`);
    
            const enterTransitionClass = 'enter-right';
            setTransitionClass(enterTransitionClass);
    
            setTimeout(() => setTransitionClass(''), 300);
        }, 300);
    };
    
    const goToNextMonth = () => {
        const exitTransitionClass = 'exit-left';
        setTransitionClass(exitTransitionClass);
    
        setTimeout(() => {
            let nextYear = parseInt(year);
            let nextMonth = parseInt(month) + 1;
            if (nextMonth > 12) {
                nextYear += 1;
                nextMonth = 1;
            }
            navigate(`/month/${nextYear}/${nextMonth}`);
    
            const enterTransitionClass = 'enter-left';
            setTransitionClass(enterTransitionClass);
    
            setTimeout(() => setTransitionClass(''), 300);
        }, 300);
    };

    const getMonthRange = (year, month) => {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1);
        return { start: startOfMonth, end: endOfMonth };
    };
    
    const { start: startOfMonth, end: endOfMonth } = getMonthRange(parseInt(year), parseInt(month));
    const totalHoursInMonth = (endOfMonth - startOfMonth) / (1000 * 60 * 60);
    

    const getCurrentHourIndex = (startOfMonth) => {
        const now = new Date();
        return now > startOfMonth ? Math.floor((now - startOfMonth) / (1000 * 60 * 60)) : -1;
    };
    
    const currentHourIndex = getCurrentHourIndex(startOfMonth);
    
    const getHourType = (hourIndex) => {
        if (hourIndex < currentHourIndex) {
            return 'past';
        } else if (hourIndex === currentHourIndex) {
            return 'present';
        }
        return 'future';
    };

    const formatHourRange = (hourIndex) => {
        const hourStart = new Date(startOfMonth.getTime() + hourIndex * 60 * 60 * 1000);
        const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);
    
        const options = { hour: 'numeric', minute: '2-digit', hour12: false };
        let startStr = hourStart.toLocaleTimeString('en-GB', options);
        let endStr = hourEnd.toLocaleTimeString('en-GB', options);
    
        const dayOfWeek = hourStart.toLocaleDateString('en-GB', { weekday: 'long' });
        const dayOfMonth = hourStart.getDate();
    
        return `Hour ${hourIndex + 1}: ${startStr} - ${endStr}, ${dayOfWeek}, ${monthName} ${dayOfMonth}`;
    };

    const hourCircleTooltipRef = useRef(null);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseOver = (e, hourIndex) => {
        setTooltipVisible(false);
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const rect = e.target.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top + window.scrollY - 130;

        const hourRangeStr = formatHourRange(hourIndex);
        setTooltipContent(hourRangeStr);
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
        if (showTooltip && hourCircleTooltipRef.current) {
            const tooltipWidth = hourCircleTooltipRef.current.offsetWidth;
            const updatedX = position.x - (tooltipWidth / 2);
            setPosition(prev => ({ ...prev, x: updatedX }));
            setTooltipVisible(true);
        }
    }, [showTooltip, tooltipContent]);

    return (
        <MonthDetailsWrapper>
            <MonthDetailsContainer className={transitionClass}>
                <TitleContainer>
                    <ArrowButton onClick={goToPreviousMonth}>
                        <ArrowLeftIcon />
                    </ArrowButton>
                    <h1>Month {monthIndex}: {monthName} {year}</h1>
                    <ArrowButton onClick={goToNextMonth}>
                        <ArrowRightIcon />
                    </ArrowButton>
                </TitleContainer>
                <HoursContainer>
                    <HoursWrapper>
                        {Array.from({ length: totalHoursInMonth }, (_, i) => {
                            const HourCircleComponent = getHourType(i) === 'past' ? PastHourCircle :
                                getHourType(i) === 'present' ? CurrentHourCircle : FutureHourCircle;
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
                {showTooltip && <CustomTooltip ref={hourCircleTooltipRef} content={tooltipContent} position={position} isVisible={tooltipVisible} />}
            </MonthDetailsContainer>
        </MonthDetailsWrapper>
    );
};

export default MonthDetails;
