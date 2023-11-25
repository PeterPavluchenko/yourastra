import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    TitleContainer,
    YearDetailsContainer, 
    YearDetailsWrapper,
    ArrowButton,
    DaysContainer,
    DaysWrapper,
    PastDayCircle,
    CurrentDayCircle,
    FutureDayCircle,
    AddNewBlockButton,
    YearItems, 
} from './year-details.styles';
import { ReactComponent as PlusIcon } from "../../../assets/plus-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';


const YearDetails = ({ user }) => {
    const { yearIndex } = useParams();
    const navigate = useNavigate();
    
    const userBirthday = user ? new Date(user.birthday) : new Date("1997-08-26");
    const yearDisplayedStart = new Date(userBirthday.getFullYear() + parseInt(yearIndex, 10) - 1, userBirthday.getMonth(), userBirthday.getDate());
    const yearDisplayedEnd = new Date(yearDisplayedStart);
    yearDisplayedEnd.setFullYear(yearDisplayedEnd.getFullYear() + 1);

    const [transitionClass, setTransitionClass] = useState('');

    const goToYear = (index, direction) => {
        const exitTransitionClass = direction === 'left' ? 'exit-right' : 'exit-left';
        setTransitionClass(exitTransitionClass);
    
        setTimeout(() => {
            navigate(`/year/${index}`);
    
            const enterTransitionClass = direction === 'left' ? 'enter-right' : 'enter-left';
            setTransitionClass(enterTransitionClass);
    
            setTimeout(() => setTransitionClass(''), 300);
        }, 300);
    };

    const goToPreviousYear = () => {
        if (yearIndex > 1) {
            goToYear(Number(yearIndex) - 1, 'left');
        }
    };

    const goToNextYear = () => {
        const maxYears = 80;
        if (yearIndex < maxYears) {
            goToYear(Number(yearIndex) + 1, 'right');
        }
    };

    const isLeapYear = (year) => {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };

    const totalDays = isLeapYear(yearDisplayedEnd.getFullYear()) ? 366 : 365;

    const today = new Date();

    const getDayCircleComponent = (dayIndex) => {
        const dayDate = new Date(yearDisplayedStart.getTime() + dayIndex * 1000 * 60 * 60 * 24);

        if (dayDate < today && dayDate.toDateString() !== today.toDateString()) {
            return PastDayCircle;
        } else if (dayDate.toDateString() === today.toDateString()) {
            return CurrentDayCircle;
        } else {
            return FutureDayCircle;
        }
    };
    
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseOver = (e, dayIndex) => {
        const dayDate = new Date(yearDisplayedStart);
        dayDate.setDate(yearDisplayedStart.getDate() + dayIndex);
    
        const formattedDate = `Day ${dayIndex + 1}: ${dayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + window.scrollY;
    
        setTooltipContent(formattedDate);
        setPosition({ x: x - 100, y: y - 130 });
        setShowTooltip(true);
    };
    
    const handleMouseOut = () => {
        setShowTooltip(false);
    };

    const [showButtonTooltip, setShowButtonTooltip] = useState(false);

    const handleButtonMouseOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) - 100;
        const y = rect.top - 130;

        setTooltipContent(`Add something for year ${yearIndex}`);
        setPosition({ x, y });
        setShowButtonTooltip(true);
    };

    const handleButtonMouseOut = () => {
        setShowButtonTooltip(false);
    };
    
    return (
        <YearDetailsWrapper>
            <YearDetailsContainer className={transitionClass}>
                <TitleContainer>
                    <ArrowButton onClick={goToPreviousYear}>
                        <ArrowLeftIcon />
                    </ArrowButton>

                    <h1>Year {yearIndex}: {yearDisplayedStart.getFullYear()} - {yearDisplayedEnd.getFullYear()}</h1>

                    <ArrowButton onClick={goToNextYear}>
                        <ArrowRightIcon />
                    </ArrowButton>
                </TitleContainer>

                <DaysContainer>
                    <DaysWrapper>
                        {Array.from({ length: totalDays }, (_, i) => {
                            const DayCircleComponent = getDayCircleComponent(i + 1);
                            return (
                                <DayCircleComponent 
                                    key={i}
                                    onMouseOver={(e) => handleMouseOver(e, i)}
                                    onMouseOut={handleMouseOut}
                                />
                            );
                        })}
                    </DaysWrapper>
                </DaysContainer>
                <YearItems>
                    <AddNewBlockButton onClick={() => {/* future functionality */}} >
                        <PlusIcon 
                            onMouseOver={handleButtonMouseOver} 
                            onMouseOut={handleButtonMouseOut}
                        />
                    </AddNewBlockButton>
                </YearItems>
                {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
                {showButtonTooltip && <CustomTooltip content={tooltipContent} position={position} />}
            </YearDetailsContainer>
        </YearDetailsWrapper>
    );
};

export default YearDetails;
