import React from 'react';
import { 
    DetailsModalWrapper,
    CloseButton,
    EditButton,
    DeleteButton,
    ButtonContainer 
} from './activityDetailsModalStyles';

import { ReactComponent as CloseIcon } from "../../assets/close-cross.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";

const ActivityDetailsModal = ({ activity, onClose, onRefresh, position }) => {
    const formatDateTimeRange = (startTimeString, endTimeString) => {
        const startDate = new Date(startTimeString);
        const endDate = new Date(endTimeString);
        const userTimezoneOffset = startDate.getTimezoneOffset() * 60000;
        startDate.setTime(startDate.getTime() + userTimezoneOffset);
        endDate.setTime(endDate.getTime() + userTimezoneOffset);

        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: false };

        let startTimeStr = startDate.toLocaleTimeString('en-US', timeOptions).replace(/^0(?=\d:)/, '');
        let endTimeStr = endDate.toLocaleTimeString('en-US', timeOptions).replace(/^0(?=\d:)/, '');

        if (startTimeStr.startsWith('24')) {
            startTimeStr = `0${startTimeStr.slice(2)}`;
        }
        if (endTimeStr.startsWith('24')) {
            endTimeStr = `0${endTimeStr.slice(2)}`;
        }

        const dateStr = startDate.toLocaleDateString('en-US', dateOptions);
        return `${dateStr}, ${startTimeStr} - ${endTimeStr}`;
    };

    const formatDuration = (startTime, endTime) => {
        const durationInMilliseconds = new Date(endTime) - new Date(startTime);
        const durationInHours = durationInMilliseconds / 3600000;
        const wholeHours = Math.floor(durationInHours);
        const minutes = Math.round((durationInHours - wholeHours) * 60);

        if (minutes === 0) {
            return `${wholeHours}h`;
        } else {
            return `${wholeHours}h ${minutes}m`;
        }
    };

    const durationFormatted = formatDuration(activity.startTime, activity.endTime);

    const dateTimeRangeFormatted = formatDateTimeRange(activity.startTime, activity.endTime);

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
            <h2>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}: {activity.startHour} - {activity.endHour} ({durationFormatted})</h2>
            <p>{dateTimeRangeFormatted}</p>
            <ButtonContainer>
                <EditButton onClick={() => { /* handle edit functionality */ }}>
                    <EditIcon />
                </EditButton>
                <DeleteButton onClick={deleteActivity}>
                    <DeleteIcon />
                </DeleteButton>
            </ButtonContainer>
        </DetailsModalWrapper>
    );
};

export default ActivityDetailsModal;