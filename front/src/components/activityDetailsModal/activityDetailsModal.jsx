import React, { useState, useEffect } from 'react';
import { 
    DetailsModalWrapper,
    CloseButton,
    GoBackButton,
    EditButton,
    DeleteButton,
    ButtonContainer, 
    TypeDurationWrapper 
} from './activityDetailsModalStyles';

import EditActivityForm from './editActivityForm';

import { ReactComponent as CloseIcon } from "../../assets/close-cross.svg";
import { ReactComponent as GoBackIcon } from "../../assets/arrow-go-back.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";

const ActivityDetailsModal = ({ activity, onClose, onRefresh, position, start, setModalHighlightedHours }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(activity);
    const [durationFormatted, setDurationFormatted] = useState('');
    const [dateTimeRangeFormatted, setDateTimeRangeFormatted] = useState('');

    useEffect(() => {
        setDurationFormatted(formatDuration(currentActivity.startTime, currentActivity.endTime));
        setDateTimeRangeFormatted(formatDateTimeRange(currentActivity.startTime, currentActivity.endTime));
    }, [currentActivity]);

    const handleEditSuccess = (updatedActivity) => {
        const startHour = calculateHourIndex(updatedActivity.startTime);
        const endHour = calculateHourIndex(updatedActivity.endTime);

        setCurrentActivity({
            ...updatedActivity,
            startHour: startHour,
            endHour: endHour
        });

        setModalHighlightedHours({ start: startHour, end: endHour });

        onRefresh(); 
    };

    const calculateHourIndex = (dateTime) => {
        const date = new Date(dateTime);
        return Math.floor((date - start) / (3600000)); 
    };

    const formatDateTimeRange = (startTimeString, endTimeString) => {
        const startDate = new Date(startTimeString);
        const endDate = new Date(endTimeString);
        const userTimezoneOffset = startDate.getTimezoneOffset() * 60000;
        startDate.setTime(startDate.getTime() + userTimezoneOffset);
        endDate.setTime(endDate.getTime() + userTimezoneOffset);

        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: false };

        let startTimeStr = startDate.toLocaleTimeString('en-US', timeOptions).replace(/^0(?=\d:)/, '');
        let endTimeStr = endDate.toLocaleTimeString('en-US', timeOptions).replace(/^0(?=\d:)/, '');

        if (startTimeStr.startsWith('24')) {
            startTimeStr = `0${startTimeStr.slice(2)}`;
        }
        if (endTimeStr.startsWith('24')) {
            endTimeStr = `0${endTimeStr.slice(2)}`;
        }

        const startDateStr = startDate.toLocaleDateString('en-US', dateOptions);
        const endDateStr = endDate.toLocaleDateString('en-US', dateOptions);
    
        // Check if the activity spans multiple days
        if (startDate.toDateString() === endDate.toDateString()) {
            return `${startDateStr}, ${startTimeStr} - ${endTimeStr}`;
        } else {
            return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`;
        }
    };

    const formatDuration = (startTime, endTime) => {
        const durationInMilliseconds = new Date(endTime) - new Date(startTime);
        const durationInHours = durationInMilliseconds / 3600000;
        const wholeHours = Math.floor(durationInHours);
        const minutes = Math.round((durationInHours - wholeHours) * 60);
    
        if (wholeHours === 0) {
            return `${minutes}m`; 
        } else if (minutes === 0) {
            return `${wholeHours}h`; 
        } else {
            return `${wholeHours}h ${minutes}m`;
        }
    };

    const deleteActivity = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/activities/${activity._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete activity');
            }
    
            onClose();
            onRefresh && onRefresh();
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <DetailsModalWrapper style={{ top: position.top, left: position.left }}>
            <CloseButton>
                <CloseIcon onClick={onClose} />
            </CloseButton>

            {isEditMode && (
                <GoBackButton>
                    <GoBackIcon onClick={() => setIsEditMode(false)} />
                </GoBackButton>
            )}

            {!isEditMode ? (
                <>
                    <TypeDurationWrapper>
                        <h2>{currentActivity.type.charAt(0).toUpperCase() + currentActivity.type.slice(1)}:</h2>
                        <p>{durationFormatted}</p>
                    </TypeDurationWrapper>
                    <p>{dateTimeRangeFormatted}</p>
                    <ButtonContainer>
                        <EditButton onClick={() => setIsEditMode(true)}>
                            <EditIcon />
                        </EditButton>
                        <DeleteButton onClick={deleteActivity}>
                            <DeleteIcon />
                        </DeleteButton>
                    </ButtonContainer>
                </>
            ) : (
                <EditActivityForm activity={currentActivity} setEditMode={setIsEditMode} onEditSuccess={handleEditSuccess} />
            )}
        </DetailsModalWrapper>
    );
};

export default ActivityDetailsModal;
