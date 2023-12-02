import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    DayDetailsContainer, 
    DayDetailsWrapper, 
    ArrowButton, 
    TitleContainer,
    MinutesContainer,
    MinutesWrapper,
    PastMinuteCircle,
    CurrentMinuteCircle,
    FutureMinuteCircle 
} from './day-details.styles';
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';

const DayDetails = ({ user }) => {
    const { dayIndex } = useParams();
    const navigate = useNavigate();
    const [transitionClass, setTransitionClass] = useState('');

    const userBirthDate = user ? new Date(user.birthday) : new Date("1997-08-26");

    const getDayDate = (index) => {
        const birthDate = new Date(userBirthDate);
        const dayDate = new Date(birthDate.getTime());
        dayDate.setDate(birthDate.getDate() + index);

        return dayDate;
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    const adjustedDayIndex = parseInt(dayIndex, 10) - 1;
    const dayDate = getDayDate(adjustedDayIndex);
    const dateStr = formatDate(dayDate);

    const goToDay = (index, direction) => {
        const exitTransitionClass = direction === 'left' ? 'exit-right' : 'exit-left';
        setTransitionClass(exitTransitionClass);
    
        setTimeout(() => {
            navigate(`/day/${index}`);
    
            const enterTransitionClass = direction === 'left' ? 'enter-right' : 'enter-left';
            setTransitionClass(enterTransitionClass);
    
            setTimeout(() => setTransitionClass(''), 300);
        }, 300);
    };
    
    const goToPreviousDay = () => {
        const currentDayIndex = parseInt(dayIndex, 10);
        if (currentDayIndex > 1) {
            goToDay(currentDayIndex - 1, 'left');
        }
    };
    
    const goToNextDay = () => {
        const currentDayIndex = parseInt(dayIndex, 10);
        const maxDays = 80 * 365;
        if (currentDayIndex < maxDays) {
            goToDay(currentDayIndex + 1, 'right');
        }
    };

    const totalMinutes = 24 * 60;
    const now = new Date();
    const startOfDay = new Date(dayDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dayDate.setHours(23, 59, 59, 999));

    let currentMinuteIndex;
    if (now >= startOfDay && now <= endOfDay) {
        currentMinuteIndex = now.getHours() * 60 + now.getMinutes();
    } else if (now < startOfDay) {
        currentMinuteIndex = -1;
    } else {
        currentMinuteIndex = 24 * 60;
    }

    const getMinuteCircleComponent = (minuteIndex) => {
        if (minuteIndex < currentMinuteIndex) {
            return PastMinuteCircle;
        } else if (minuteIndex === currentMinuteIndex) {
            return CurrentMinuteCircle;
        } else {
            return FutureMinuteCircle;
        }
    };

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const formatMinuteRange = (minuteIndex) => {
        const hour = Math.floor(minuteIndex / 60);
        const minute = minuteIndex % 60;
        const nextMinute = (minute + 1) % 60;
        const nextHour = minute === 59 ? hour + 1 : hour;

        return `Minute ${minuteIndex + 1}: ${hour}:${minute.toString().padStart(2, '0')} - ${nextHour}:${nextMinute.toString().padStart(2, '0')}`;
    };

    const minuteCircleTooltipRef = useRef(null);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseOver = (e, minuteIndex) => {
        setTooltipVisible(false);
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const rect = e.target.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top + window.scrollY - 130;

        const minuteRangeStr = formatMinuteRange(minuteIndex);
        setTooltipContent(minuteRangeStr);
        setPosition({ x, y });
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
        if (showTooltip && minuteCircleTooltipRef.current) {
            const tooltipWidth = minuteCircleTooltipRef.current.offsetWidth;
            const updatedX = position.x - (tooltipWidth / 2);
            setPosition(prev => ({ ...prev, x: updatedX }));
            setTooltipVisible(true);
        }
    }, [showTooltip, tooltipContent]);

    return (
        <DayDetailsWrapper>
            <DayDetailsContainer className={transitionClass}>
                <TitleContainer>
                    <ArrowButton onClick={goToPreviousDay}>
                        <ArrowLeftIcon />
                    </ArrowButton>

                    <h1>Day {adjustedDayIndex + 1}: {dateStr}</h1>

                    <ArrowButton onClick={goToNextDay}>
                        <ArrowRightIcon />
                    </ArrowButton>
                </TitleContainer>

                <MinutesContainer>
                <MinutesWrapper>
                    {Array.from({ length: totalMinutes }, (_, i) => {
                        const MinuteCircleComponent = getMinuteCircleComponent(i);
                        return (
                            <MinuteCircleComponent 
                                key={i}
                                onMouseOver={(e) => handleMouseOver(e, i)}
                                onMouseOut={handleMouseOut}
                            />
                        );
                    })}
                </MinutesWrapper>
            </MinutesContainer>
            {showTooltip && <CustomTooltip ref={minuteCircleTooltipRef} content={tooltipContent} position={position} isVisible={tooltipVisible} />}
            </DayDetailsContainer>
        </DayDetailsWrapper>
    );
};

export default DayDetails;
