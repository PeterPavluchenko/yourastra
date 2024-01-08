import React, { useState, useRef, useEffect } from 'react';
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';
import { ReactComponent as SleepTypeIcon } from "../../../assets/type-icons/sleep-type-icon.svg";
import { ReactComponent as RunningTypeIcon } from "../../../assets/type-icons/running-type-icon.svg";
import { ReactComponent as WorkTypeIcon } from "../../../assets/type-icons/work-type-icon.svg";
import { ReactComponent as VocabTypeIcon } from "../../../assets/type-icons/vocab-type-icon.svg";
import { ReactComponent as ProjectTypeIcon } from "../../../assets/type-icons/project-type-icon.svg";
import { ReactComponent as SwimmingTypeIcon } from "../../../assets/type-icons/swimming-type-icon.svg";
import { ReactComponent as ResistanceTypeIcon } from "../../../assets/type-icons/resistance-type-icon.svg";
import { ReactComponent as StretchingTypeIcon } from "../../../assets/type-icons/stretching-type-icon.svg";
import { ReactComponent as FriendsTypeIcon } from "../../../assets/type-icons/friends-type-icon.svg";
import { ReactComponent as WalkingTypeIcon } from "../../../assets/type-icons/walking-type-icon.svg";
import { ReactComponent as FamilyTypeIcon } from "../../../assets/type-icons/family-type-icon.svg";
import { ReactComponent as CookingTypeIcon } from "../../../assets/type-icons/cooking-type-icon.svg";
import { ReactComponent as EatingTypeIcon } from "../../../assets/type-icons/eating-type-icon.svg";
import { ReactComponent as ReadingTypeIcon } from "../../../assets/type-icons/reading-type-icon.svg";
import { ReactComponent as OtherTypeIcon } from "../../../assets/type-icons/other-type-icon.svg";

import { ActivityTypesContainer, ActivityTypeColumn, ActivityIcon, ActivityCirclesContainer, ActivityCircle, FutureActivityCircle, CurrentActivityCircle } from './ActivityTypeColumnsStyles';

import ActivityTypeDetailsModal from '../../../components/activityTypeDetailsModal/activityTypeDetailsModal';

const ActivityTypeColumns = ({ activities, onActivityTypeHover, weekStatus, start, end, scrollContainerRef, onUpdateHighlightedHours, onActivityTypeModalOpen, isModalOpen, setIsModalOpen }) => {
    const activityTypes = [...new Set(activities.map(activity => activity.type))];
    activityTypes.push('other');

    const calculateTotalActivityTime = () => {
        return activities.reduce((sum, activity) => {
            const start = new Date(activity.startTime).getTime();
            const end = new Date(activity.endTime).getTime();
            return sum + (end - start);
        }, 0);
    };

    const totalWeekMillis = 168 * 60 * 60 * 1000;
    const remainingTimeMillis = totalWeekMillis - calculateTotalActivityTime();

    const [modalContent, setModalContent] = useState({ type: '', duration: '' });
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const [hoveredType, setHoveredType] = useState(null);
    const [clickedType, setClickedType] = useState([]);

    const [showTypeIconTooltip, setShowTypeIconTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef(null);

    const [tooltipVisible, setTooltipVisible] = useState(false);
    
    useEffect(() => {
        if (showTypeIconTooltip && tooltipRef.current) {
            const tooltipWidth = tooltipRef.current.offsetWidth;
            const updatedX = position.x - (tooltipWidth / 2);
            setPosition(prev => ({ ...prev, x: updatedX }));
            setTooltipVisible(true);
        }
    }, [showTypeIconTooltip, tooltipContent]);

    const handleMouseOver = (event, type) => {
        if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
            return;
        }
    
        let totalMillis;
        if (type === 'other') {
            totalMillis = remainingTimeMillis;
        } else {
            totalMillis = activities
                .filter(activity => activity.type === type)
                .reduce((sum, activity) => {
                    const start = new Date(activity.startTime).getTime();
                    const end = new Date(activity.endTime).getTime();
                    return sum + (end - start);
                }, 0);
        }
    
        let tooltipText = '';
        const totalMinutes = Math.round(totalMillis / 60000);

        console.log("totalMinutes handleMouseOver: " + totalMinutes)

        console.log("totalMillis hover: " + totalMillis)
        
        if (totalMinutes < 60) {
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${totalMinutes}m`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${hours}h`;
        }
    
        const rect = event.currentTarget.getBoundingClientRect();
        const scrollContainer = scrollContainerRef.current;
        const containerScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
        const iconCenterX = rect.left + (rect.width / 2);
        const y = rect.top + containerScrollTop - 125;
    
        setPosition({ x: iconCenterX, y });
        setShowTypeIconTooltip(true);
        setTooltipContent(tooltipText);
        setHoveredType(type);
        onActivityTypeHover(type);
    };
    
    const handleMouseOut = (event) => {
        if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
            return;
        }
        setTooltipVisible(false);
        setShowTypeIconTooltip(false);
        setHoveredType(null);
        onActivityTypeHover(null);
    };
    
    const renderActivityCircles = (activities, type) => {
        const currentTime = new Date();
        const timezoneOffsetMillis = currentTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const currentTimeUTC = new Date(currentTime.getTime() - timezoneOffsetMillis);

        const weekStartMillis = new Date(start).getTime();
        const weekEndMillis = new Date(end).getTime();
    
        let pastMillis = 0;
        let futureMillis = 0;

        let isCurrentActivity = false;
        let isActivityHappeningNow = false;

        activities.forEach(activity => {
            const startMillis = new Date(activity.startTime).getTime();
            const endMillis = new Date(activity.endTime).getTime();
            if (startMillis <= currentTimeUTC && currentTimeUTC < endMillis) {
                isActivityHappeningNow = true;
            }
        });

        if (type === 'other') {
            if (weekStatus === "past") {
                pastMillis = remainingTimeMillis; 
            } else if (weekStatus === "future") {
                futureMillis = remainingTimeMillis; 
            } else {
                pastMillis = currentTimeUTC - weekStartMillis;
                futureMillis = weekEndMillis - currentTimeUTC;

                activities.forEach(activity => {
                    const startMillis = new Date(activity.startTime).getTime();
                    const endMillis = new Date(activity.endTime).getTime();
                    if (endMillis <= currentTimeUTC) {
                        pastMillis -= (endMillis - startMillis);
                    } else if (startMillis < currentTimeUTC) {
                        pastMillis -= (currentTimeUTC - startMillis);
                        futureMillis -= (endMillis - currentTimeUTC);
                    } else {
                        futureMillis -= (endMillis - startMillis);
                    }
                });
            }
        } else {
            activities
            .filter(activity => activity.type === type)
            .forEach(activity => {
                const startMillis = new Date(activity.startTime).getTime();
                const endMillis = new Date(activity.endTime).getTime();

                if (startMillis <= currentTimeUTC && currentTimeUTC < endMillis) {
                    isCurrentActivity = true;
                }

                if (endMillis <= currentTimeUTC) {
                    pastMillis += (endMillis - startMillis);
                } else if (startMillis < currentTimeUTC) {
                    pastMillis += (currentTimeUTC - startMillis);
                    futureMillis += (endMillis - currentTimeUTC);
                } else {
                    futureMillis += (endMillis - startMillis);
                }
            });
        }
    
        let pastHours = calculateHours(pastMillis);
        let futureHours = calculateHours(futureMillis);
        let futureMinutes = calculateMinutes(futureMillis);
        let pastMinutes = calculateMinutes(pastMillis);
        let totalMinutes = futureMinutes + pastMinutes;

        const futureRemainderMinutes = futureMinutes % 60;
        const pastRemainderMinutes = pastMinutes % 60;
        const totalRemainderMinutes = futureRemainderMinutes + pastRemainderMinutes;

        const circles = [];

        
        if(type === "project"){
            console.log("pastHoursInitially: " + pastHours)
            console.log("totalMillis: " + pastMillis + futureMillis)
        }

        if (totalRemainderMinutes >= 60) {
            pastHours += 1;
        }
        

        if ((type === 'other' && weekStatus === "present" && !isActivityHappeningNow) || (weekStatus === "present" && isCurrentActivity)) {
            if (pastHours > 0 && pastMinutes >= 60 && futureMinutes < 60) {
                pastHours--;
            }
        }

        if (pastHours > 1 || (pastHours === 1 && isCurrentActivity !== true)) {
            for (let i = 0; i < pastHours; i++) {
                circles.push(
                    <ActivityCircle
                        key={`${type}-past-${i}`}
                        className={(hoveredType === type || type === clickedType) ? 'highlighted' : ''} 
                    />
                );
            }
        }

        if (circles.length === 0 && pastMillis > 0 && type !== "other" && isCurrentActivity !== true) {
            circles.push(
                <ActivityCircle
                    key={`${type}-past-0`}
                    className={(hoveredType === type || type === clickedType) ? 'highlighted' : ''}
                />
            );
        }

        if ((type === 'other' && weekStatus === "present" && !isActivityHappeningNow) || (weekStatus === "present" && isCurrentActivity)) {
            circles.push(
                <CurrentActivityCircle
                    key={`${type}-current`}
                    className={(hoveredType === type || type === clickedType) ? 'highlighted' : ''}
                />
            );

            if (futureHours > 0 && futureMinutes >= 60) {
                futureHours--;
            }
        }

        for (let i = 0; i < futureHours; i++) {
            circles.push(
                <FutureActivityCircle
                    key={`${type}-future-${i}`}
                    className={(hoveredType === type || type === clickedType) ? 'highlighted' : ''} 
                />
            );
        }

        if (circles.length === 0 && futureMillis > 0 && type !== "other" && isCurrentActivity !== true) {
            circles.push(
                <FutureActivityCircle
                    key={`${type}-future-0`}
                    className={(hoveredType === type || type === clickedType) ? 'highlighted' : ''} 
                />
            );
        }

        if(type === "project"){
            console.log("totalRemainderMinutes: " + totalRemainderMinutes)
            console.log("futureMinutes: " + futureMinutes)
            console.log("pastMinutes: " + pastMinutes)
            console.log("futureHours: " + futureHours)
            console.log("pastHours: " + pastHours)
            console.log("totalMinutes: " + totalMinutes)
        }
    
        return (
            <ActivityCirclesContainer>
                {circles}
            </ActivityCirclesContainer>
        );
    };

    const calculateHours = (millis) => {
        const hours = millis / 3600000;
        return hours >= 0 ? Math.floor(hours) : Math.ceil(hours);
    };

    const calculateMinutes = (millis) => {
        const minutes = millis / 60000;
        return minutes >= 0 ? Math.round(minutes) : Math.ceil(minutes);
    };

    const getActivityTypeIcon = (type, handleMouseOver, handleMouseOut) => {
        const IconComponent = {
            sleep: SleepTypeIcon,
            running: RunningTypeIcon,
            work: WorkTypeIcon,
            vocabulary: VocabTypeIcon,
            project: ProjectTypeIcon,
            swimming: SwimmingTypeIcon,
            resistance: ResistanceTypeIcon,
            stretching: StretchingTypeIcon,
            friends: FriendsTypeIcon,
            walking: WalkingTypeIcon,
            family: FamilyTypeIcon,
            cooking: CookingTypeIcon,
            eating: EatingTypeIcon,
            reading: ReadingTypeIcon,
            other: OtherTypeIcon,
        }[type];
    
        return IconComponent ? (
            <ActivityIcon
                onMouseOver={(e) => handleMouseOver(e, type)}
                onMouseOut={handleMouseOut}
                onClick={(e) => handleIconClick(e, type)}
            >
                <IconComponent />
            </ActivityIcon>
        ) : null;
    };

    const handleIconClick = (e, type) => {
        let totalMillis;

        if (type === 'other') {
            // Calculate the total time spent on all activities
            const totalActivityTime = activities.reduce((sum, activity) => {
                const start = new Date(activity.startTime).getTime();
                const end = new Date(activity.endTime).getTime();
                return sum + (end - start);
            }, 0);

            // Total time in a week in milliseconds
            const totalWeekMillis = 168 * 60 * 60 * 1000;

            // Calculate remaining time
            totalMillis = totalWeekMillis - totalActivityTime;
        } else {
            totalMillis = activities
                .filter(activity => activity.type === type)
                .reduce((sum, activity) => {
                    const start = new Date(activity.startTime).getTime();
                    const end = new Date(activity.endTime).getTime();
                    return sum + (end - start);
                }, 0);
        }

        const totalMinutes = Math.round(totalMillis / 60000);
        let durationText = '';
        if (totalMinutes < 60) {
            durationText = `${totalMinutes}m`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            durationText = `${hours}h`;
            if (minutes > 0) {
                durationText += ` ${minutes}m`;
            }
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const scrollContainer = scrollContainerRef.current;
        const containerScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
        const x = rect.left - (rect.width / 2);
        const y = rect.top + containerScrollTop - 130;
    
        setModalContent({ type: `${type.charAt(0).toUpperCase() + type.slice(1)}`, duration: durationText });
        setModalPosition({
            top: y,
            left: x
        });

        onUpdateHighlightedHours(type);
        setIsModalOpen(true);
        onActivityTypeModalOpen();
        setClickedType(type);
    };
    
    
    return (
        <ActivityTypesContainer>
            {activityTypes.map(type => (
                <ActivityTypeColumn key={type}>
                    {getActivityTypeIcon(type, handleMouseOver, handleMouseOut)}
                    {renderActivityCircles(activities, type)}
                </ActivityTypeColumn>   
            ))}
            {showTypeIconTooltip && 
                <CustomTooltip 
                    ref={tooltipRef} 
                    content={tooltipContent} 
                    position={position} 
                    isVisible={tooltipVisible}
            />}
            {isModalOpen && (
                <ActivityTypeDetailsModal
                    onClose={() => {
                        setIsModalOpen(false);
                        onUpdateHighlightedHours([]); 
                        setClickedType(null);
                    }}
                    position={modalPosition}
                    type={modalContent.type}
                    duration={modalContent.duration}
                />
            )}
        </ActivityTypesContainer>
    );
};


export default ActivityTypeColumns;