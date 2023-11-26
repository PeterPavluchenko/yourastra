import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    HoursContainer,
    HoursWrapper, 
    CurrentHourCircle, 
    PastHourCircle, 
    FutureHourCircle,
    AddNewBlockButton,
    WeekItems,
    ArrowButton,
    TitleContainer,
    WeekDetailsContainer,
    WeekDetailsWrapper,
    SleepIconStyle,
    RunningIconStyle,
    WorkIconStyle,
    VocabIconStyle,
    ProjectIconStyle
} from './week-details.styles';
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';
import { ReactComponent as PlusIcon } from "../../../assets/plus-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";

import ActivityModal from '../../../components/activityModal/activityModal';
import ActivityDetailsModal from '../../../components/activityDetailsModal/activityDetailsModal';

const WeekDetails = ({ user }) => {
    const { weekIndex } = useParams();
    const navigate = useNavigate();
    
    const userBirthDate = user ? new Date(user.birthday) : new Date("1997-08-26");

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [transitionClass, setTransitionClass] = useState('');

    const [activities, setActivities] = useState([]);
    const [highlightedHours, setHighlightedHours] = useState({ start: null, end: null });


    const getWeekRange = (index) => {
        const birthDate = new Date(userBirthDate);
        const weekStart = new Date(birthDate.getTime());
    
        if (index === 1) {
            weekStart.setDate(birthDate.getDate() - birthDate.getDay() + 1);
        } else {
            weekStart.setDate(birthDate.getDate() + (7 * (index - 1)) - birthDate.getDay() + 1);
        }
        weekStart.setHours(0, 0, 0, 0);
    
        const weekEnd = new Date(weekStart.getTime());
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
    
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
    const [showActivityTooltip, setShowActivityTooltip] = useState(false);
    
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

    const [showAddActivityModal, setShowAddActivityModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const addButtonRef = useRef(null);

    const handleAddButtonClick = () => {
        if (addButtonRef.current) {
            const position = addButtonRef.current.getBoundingClientRect();
            setModalPosition({ top: position.top - 100, left: position.left - 85 });
        }
        setShowAddActivityModal(true);
    };

    const fetchActivities = async (start, end) => {
        const offset = start.getTimezoneOffset() * 60000;
        const startUTC = new Date(start.getTime() - offset).toISOString();
        const endUTC = new Date(end.getTime() - offset).toISOString();
    
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/activities?start=${startUTC}&end=${endUTC}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
    
        const activities = await response.json();
    
        const sortedActivities = activities.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setActivities(sortedActivities);
    };

    useEffect(() => {
        const { start, end } = getWeekRange(parseInt(weekIndex, 10));
        fetchActivities(start, end).catch(console.error);
    }, [weekIndex]); 

    const formatActivityTooltip = (activity) => {
        const getHourIndex = (date) => {
            const activityDate = new Date(date);
            return Math.floor((activityDate - start) / (3600000)); 
        };
    
        const startHour = getHourIndex(activity.startTime);
        const endHour = getHourIndex(activity.endTime);
        return `${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}: Hours ${startHour}-${endHour}`;
    };

    const handleActivityMouseOver = (e, activity) => {
        if (showActivityDetailsModal || showAddActivityModal) {
            return; 
        }

        const formattedTooltip = formatActivityTooltip(activity);
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: (rect.left + rect.width / 2) - 70, y: rect.top + window.scrollY - 130 });
        setTooltipContent(formattedTooltip);
        setShowActivityTooltip(true);
    
        const startHour = calculateHourIndex(activity.startTime);
        const endHour = calculateHourIndex(activity.endTime);
        
        highlightHours(startHour, endHour);
    };
    
    const calculateHourIndex = (dateTime) => {
        const date = new Date(dateTime);
        return Math.floor((date - start) / (3600000)); 
    };

    const highlightHours = (startHour, endHour) => {
        setHighlightedHours({ start: startHour, end: endHour });
    };

    const handleActivityMouseOut = () => {
        setShowActivityTooltip(false);
        setHighlightedHours({ start: null, end: null });
    };

    const handleActivityFocus = (e, activity) => {
        if (showActivityDetailsModal || showAddActivityModal) {
            return; 
        }
        
        const formattedTooltip = formatActivityTooltip(activity);
        const rect = e.target.getBoundingClientRect();
        setPosition({ x: rect.left + rect.width / 2  - 70, y: rect.top + window.scrollY - 130 }); 
        setTooltipContent(formattedTooltip);
        setShowActivityTooltip(true);
    };

    const handleActivityBlur = () => {
        setShowActivityTooltip(false);
    };

    const [showActivityDetailsModal, setShowActivityDetailsModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activityModalPosition, setActivityModalPosition] = useState({ top: 0, left: 0 });

    const [modalHighlightedHours, setModalHighlightedHours] = useState({ start: null, end: null });

    const handleActivityClick = (e, activity) => {
        const startHour = calculateHourIndex(activity.startTime);
        const endHour = calculateHourIndex(activity.endTime);
        setModalHighlightedHours({ start: startHour, end: endHour });

        const position = e.currentTarget.getBoundingClientRect();
        setSelectedActivity({
            ...activity,
            startHour: startHour,
            endHour: endHour
        });
        setActivityModalPosition({
            top: position.top - 100,
            left: position.left - (position.width / 2)
        });
        setShowActivityDetailsModal(true);
    };

    const closeActivityDetailsModal = () => {
        setShowActivityDetailsModal(false);
        setModalHighlightedHours({ start: null, end: null }); 
    };

    useEffect(() => {
        setShowActivityDetailsModal(false);
        setShowAddActivityModal(false);
    }, [weekIndex]);

    const handleKeyDown = (e, activity) => {
        if (e.key === 'Enter') {
            handleActivityClick(e, activity);
        }
    };

    const refreshActivities = async () => {
        const { start, end } = getWeekRange(parseInt(weekIndex, 10));
        await fetchActivities(start, end);
    };

    const isCurrentActivity = (activity) => {
        const now = new Date();
        const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));
    
        return nowUTC >= new Date(activity.startTime) && nowUTC <= new Date(activity.endTime);
    };

    const activityTypeToComponent = (type, isCurrent) => {
        const components = {
            sleep: <SleepIconStyle isCurrent={isCurrent} />,
            running: <RunningIconStyle isCurrent={isCurrent} />,
            work: <WorkIconStyle isCurrent={isCurrent} />,
            vocabulary: <VocabIconStyle isCurrent={isCurrent} />,
            project: <ProjectIconStyle isCurrent={isCurrent} />,
        };
        return components[type] || null;
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
                            const isHighlighted = i >= (highlightedHours.start - 1) && i <= (highlightedHours.end - 1) ||
                                                i >= (modalHighlightedHours.start - 1) && i <= (modalHighlightedHours.end - 1);
                            return (
                                <HourCircleComponent 
                                    key={i}
                                    className={isHighlighted ? 'highlighted' : ''}
                                    onMouseOver={(e) => handleMouseOver(e, i)}
                                    onMouseOut={handleMouseOut}
                                />
                            );
                        })}
                    </HoursWrapper>
                </HoursContainer>
                <WeekItems>
                    {activities.map((activity, index) => {
                        const isCurrent = isCurrentActivity(activity);

                        return (
                            <div key={index}
                                onClick={(e) => handleActivityClick(e, activity)}
                                onMouseOver={(e) => handleActivityMouseOver(e, activity)}
                                onMouseOut={handleActivityMouseOut}
                                onFocus={(e) => handleActivityFocus(e, activity)}
                                onBlur={handleActivityBlur}
                                onKeyDown={(e) => handleKeyDown(e, activity)}
                                tabIndex="0"
                            >
                                {activityTypeToComponent(activity.type, isCurrent)}
                            </div>
                        )
                    })}
                    <AddNewBlockButton ref={addButtonRef} onClick={handleAddButtonClick}>
                        <PlusIcon 
                            onMouseOver={handleButtonMouseOver} 
                            onMouseOut={handleButtonMouseOut}
                        />
                    </AddNewBlockButton>
                </WeekItems>
                {showActivityDetailsModal && (
                    <ActivityDetailsModal
                        activity={selectedActivity}
                        onClose={closeActivityDetailsModal}
                        onRefresh={refreshActivities} 
                        position={activityModalPosition}
                    />
                )}
                {showAddActivityModal && (
                    <ActivityModal 
                      onClose={() => setShowAddActivityModal(false)} 
                      position={modalPosition}
                      weekStartDate={start}
                      onActivitySave={() => fetchActivities(start, end)}
                    />
                  )}
                {showTooltip && <CustomTooltip content={tooltipContent} position={position} />}
                {showButtonTooltip && <CustomTooltip content={tooltipContent} position={position} />}
                {showActivityTooltip && <CustomTooltip content={tooltipContent} position={position} />}
            </WeekDetailsContainer>
        </WeekDetailsWrapper>
    );
};

export default WeekDetails;