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
    
        let pastHours = Math.round(pastMillis / 3600000);
        let futureHours = Math.round(futureMillis / 3600000);

        if (weekStatus === "present" && isCurrentActivity) {
            futureHours -= 1;
        }

        const circles = [];

        if (pastHours > 1 || (pastHours === 1 && isCurrentActivity !== true)) {
            for (let i = 0; i < pastHours; i++) {
                circles.push(
                    <ActivityCircle
                        key={`${type}-past-${i}`}
                        className={hoveredType === type ? 'highlighted' : ''} 
                    />
                );
            }
        }

        if (circles.length === 0 && pastMillis > 0 && type !== "other" && isCurrentActivity !== true) {
            circles.push(
                <ActivityCircle
                    key={`${type}-past-0`}
                    className={hoveredType === type ? 'highlighted' : ''}
                />
            );
        }

        if ((type === 'other' && weekStatus === "present" && !isActivityHappeningNow) || (weekStatus === "present" && isCurrentActivity)) {
            circles.push(
                <CurrentActivityCircle
                    key={`${type}-current`}
                    className={hoveredType === type ? 'highlighted' : ''}
                />
            );
            futureHours -= 1;
        }

        for (let i = 0; i < futureHours; i++) {
            circles.push(
                <FutureActivityCircle
                    key={`${type}-future-${i}`}
                    className={hoveredType === type ? 'highlighted' : ''} 
                />
            );
        }
    
        return (
            <ActivityCirclesContainer>
                {circles}
            </ActivityCirclesContainer>
        );
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
    
        setModalContent({ type: `${type.charAt(0).toUpperCase() + type.slice(1)}`, duration: durationText });
        const position = e.currentTarget.getBoundingClientRect();
        setModalPosition({
            top: position.top - 100,
            left: position.left - (position.width / 2)
        });

        onUpdateHighlightedHours(type);
        setIsModalOpen(true);
        onActivityTypeModalOpen();
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