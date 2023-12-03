import React, { useState, useRef, useEffect } from 'react';
import CustomTooltip from '../../../components/custom-tooltip/custom-tooltip';
import { ReactComponent as SleepTypeIcon } from "../../../assets/type-icons/sleep-type-icon.svg";
import { ReactComponent as RunningTypeIcon } from "../../../assets/type-icons/running-type-icon.svg";
import { ReactComponent as WorkTypeIcon } from "../../../assets/type-icons/work-type-icon.svg";
import { ReactComponent as VocabTypeIcon } from "../../../assets/type-icons/vocab-type-icon.svg";
import { ReactComponent as ProjectTypeIcon } from "../../../assets/type-icons/project-type-icon.svg";

import { ActivityTypesContainer, ActivityTypeColumn, ActivityIcon, ActivityCirclesContainer, ActivityCircle } from './ActivityTypeColumnsStyles';

const getActivityTypeIcon = (type, handleMouseOver, handleMouseOut) => {
    const IconComponent = {
        sleep: SleepTypeIcon,
        running: RunningTypeIcon,
        work: WorkTypeIcon,
        vocabulary: VocabTypeIcon,
        project: ProjectTypeIcon,
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

const ActivityTypeColumns = ({ activities, onActivityTypeHover }) => {
    const activityTypes = [...new Set(activities.map(activity => activity.type))];
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
    
        const totalMillis = activities
            .filter(activity => activity.type === type)
            .reduce((sum, activity) => {
                const start = new Date(activity.startTime).getTime();
                const end = new Date(activity.endTime).getTime();
                return sum + (end - start);
            }, 0);
    
        let tooltipText = '';
        const totalMinutes = Math.round(totalMillis / 60000);
        if (totalMinutes < 60) {
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${totalMinutes} minutes`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            tooltipText = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${hours} ${hours === 1 ? "hour" : "hours"}`;
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
        const totalMillis = activities
            .filter(activity => activity.type === type)
            .reduce((sum, activity) => {
                const start = new Date(activity.startTime).getTime();
                const end = new Date(activity.endTime).getTime();
                return sum + (end - start);
            }, 0);
    
        const totalHours = Math.round(totalMillis / 3600000);
        const circles = [];
        for (let i = 0; i < totalHours; i++) {
            circles.push(
                <ActivityCircle
                    key={`${type}-${i}`}
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