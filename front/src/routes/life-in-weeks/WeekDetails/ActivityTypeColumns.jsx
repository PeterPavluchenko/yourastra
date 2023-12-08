import React, { useState, useRef, useEffect } from 'react';
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';
import { ReactComponent as SleepTypeIcon } from "../../../assets/type-icons/sleep-type-icon.svg";
import { ReactComponent as RunningTypeIcon } from "../../../assets/type-icons/running-type-icon.svg";
import { ReactComponent as WorkTypeIcon } from "../../../assets/type-icons/work-type-icon.svg";
import { ReactComponent as VocabTypeIcon } from "../../../assets/type-icons/vocab-type-icon.svg";
import { ReactComponent as ProjectTypeIcon } from "../../../assets/type-icons/project-type-icon.svg";
import { ReactComponent as OtherTypeIcon } from "../../../assets/type-icons/other-type-icon.svg";

import { ActivityTypesContainer, ActivityTypeColumn, ActivityIcon, ActivityCirclesContainer, ActivityCircle, FutureActivityCircle } from './ActivityTypeColumnsStyles';

const getActivityTypeIcon = (type, handleMouseOver, handleMouseOut) => {
    const IconComponent = {
        sleep: SleepTypeIcon,
        running: RunningTypeIcon,
        work: WorkTypeIcon,
        vocabulary: VocabTypeIcon,
        project: ProjectTypeIcon,
        other: OtherTypeIcon,
    }[type];

    return IconComponent ? (
        <ActivityIcon
            onMouseOver={(e) => handleMouseOver(e, type)}
            onMouseOut={handleMouseOut}
        >
            <IconComponent />
        </ActivityIcon>
    ) : null;
};

const ActivityTypeColumns = ({ activities, onActivityTypeHover, weekStatus, start, end }) => {
    const activityTypes = [...new Set(activities.map(activity => activity.type))];
    activityTypes.push('other');

    const calculateTotalActivityTime = () => {
        return activities.reduce((sum, activity) => {
            const start = new Date(activity.startTime).getTime();
            const end = new Date(activity.endTime).getTime();
            return sum + (end - start);
        }, 0);
    };

    console.log(start)
    console.log(end)

    const totalWeekMillis = 168 * 60 * 60 * 1000;
    const remainingTimeMillis = totalWeekMillis - calculateTotalActivityTime();

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
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${totalMinutes} minute${totalMinutes === 1 ? '' : 's'}`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${hours} hour${hours === 1 ? '' : 's'}`;
        }
    
        const rect = event.currentTarget.getBoundingClientRect();
        const iconCenterX = rect.left + (rect.width / 2);
        const y = rect.top - 125;
    
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
        const currentTime = new Date().getTime();

        const weekStartMillis = new Date(start).getTime();
        const weekEndMillis = new Date(end).getTime();
    
        let pastMillis = 0;
        let futureMillis = 0;
    
        if (type === 'other') {
            if (weekStatus === "past") {
                pastMillis = remainingTimeMillis; 
            } else if (weekStatus === "future") {
                futureMillis = remainingTimeMillis; 
            } else {
                pastMillis = currentTime - weekStartMillis;
                futureMillis = weekEndMillis - currentTime;

                activities.forEach(activity => {
                    const startMillis = new Date(activity.startTime).getTime();
                    const endMillis = new Date(activity.endTime).getTime();
                    if (endMillis <= currentTime) {
                        pastMillis -= (endMillis - startMillis);
                    } else if (startMillis < currentTime) {
                        pastMillis -= (currentTime - startMillis);
                        futureMillis -= (endMillis - currentTime);
                    } else {
                        futureMillis -= (endMillis - startMillis);
                    }
                });
            }
        } else {
            activities
                .filter(activity => activity.type === type)
                .forEach(activity => {
                    const start = new Date(activity.startTime).getTime();
                    const end = new Date(activity.endTime).getTime();
                    if (end <= currentTime) {
                        pastMillis += (end - start);
                    } else if (start < currentTime) {
                        pastMillis += (currentTime - start);
                        futureMillis += (end - currentTime);
                    } else {
                        futureMillis += (end - start);
                    }
                });
        }
    
        const pastHours = Math.round(pastMillis / 3600000);
        const futureHours = Math.round(futureMillis / 3600000);
    
        const circles = [];
        for (let i = 0; i < pastHours; i++) {
            circles.push(
                <ActivityCircle
                    key={`${type}-past-${i}`}
                    className={hoveredType === type ? 'highlighted' : ''} 
                />
            );
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
        </ActivityTypesContainer>
    );
};


export default ActivityTypeColumns;