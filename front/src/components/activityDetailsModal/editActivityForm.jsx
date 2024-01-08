import React, { useState, useEffect } from 'react';
import { ModalSelect, TimeSelectContainer } from '../activityModal/activityModalStyles';
import { SaveButton, StyledForm } from './activityDetailsModalStyles';

const EditActivityForm = ({ activity, setEditMode, onEditSuccess }) => {

    const [activityType, setActivityType] = useState(activity.type);
    const [startTime, setStartTime] = useState({ day: '', hour: '', minute: '' });
    const [endTime, setEndTime] = useState({ day: '', hour: '', minute: '' });

    useEffect(() => {
        if (activity) {
            parseActivityTime(activity.startTime, setStartTime);
            parseActivityTime(activity.endTime, setEndTime);
        }
    }, [activity]);

    const parseActivityTime = (isoString, setTime) => {
        if (isoString) {
            const dateParts = isoString.split('T')[0].split('-');
            const timeParts = isoString.split('T')[1].split(':');

            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
            const day = parseInt(dateParts[2], 10);
            const hour = parseInt(timeParts[0], 10);
            const minute = parseInt(timeParts[1], 10);

            const date = new Date(Date.UTC(year, month, day, hour, minute));
            setTime({
                day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                hour: hour,
                minute: minute.toString().padStart(2, '0'),
            });
        }
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = Array.from({ length: 24 }, (_, i) => i); 
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const handleTimeChange = (e, timeType) => {
        const setTime = timeType === 'start' ? setStartTime : setEndTime;
        setTime({ ...timeType === 'start' ? startTime : endTime, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedActivity = {
            type: activityType, 
            startTime: convertToISO(startTime),
            endTime: convertToISO(endTime),
            startHour: activity.startHour,
            endHour: activity.endHour,
        };
    
        try {
            const response = await fetch(`http://localhost:5000/api/activities/${activity._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedActivity)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update activity');
            }
    
            setEditMode(false);

            const updatedActivityData = await response.json();

            if (onEditSuccess) {
                onEditSuccess(updatedActivityData);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleSelectChange = (e) => {
        setActivityType(e.target.value);
    };

    function convertToISO({ day, hour, minute }) {
        const daysOfWeekMap = {
            "Monday": 1, "Tuesday": 2, "Wednesday": 3,
            "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 0
        };
    
        const selectedDayIndex = daysOfWeekMap[day];
        const currentDayIndex = new Date().getDay();
        const currentDate = new Date();
    
        const dayDifference = selectedDayIndex - currentDayIndex;
        currentDate.setDate(currentDate.getDate() + dayDifference);
    
        currentDate.setHours(hour, minute, 0, 0); 
    
        const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
        const utcDate = new Date(currentDate.getTime() - timezoneOffset);
        return utcDate.toISOString();
    }
    
    return (
        <StyledForm onSubmit={handleSubmit}>
            <ModalSelect defaultValue={activity.type} onChange={handleSelectChange}>
                <option value="" disabled hidden>Select something</option>
                <option value="sleep">Sleep</option>
                <option value="running">Running</option>
                <option value="work">Work</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="project">Project</option>
                <option value="resistance">Resistance training</option>
                <option value="stretching">Stretching</option>
                <option value="friends">Friends</option>
                <option value="walking">Walking</option>
                <option value="family">Family</option>
                <option value="cooking">Cooking</option>
                <option value="eating">Eating</option>
                <option value="reading">Reading</option>
            </ModalSelect>

            <p>Start Time:</p>
            <TimeSelectContainer>
                <ModalSelect name="day" value={startTime.day} onChange={(e) => handleTimeChange(e, 'start')}>
                    {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </ModalSelect>
                <ModalSelect name="hour" value={startTime.hour} onChange={(e) => handleTimeChange(e, 'start')}>
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </ModalSelect>
                <ModalSelect name="minute" value={startTime.minute} onChange={(e) => handleTimeChange(e, 'start')}>
                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </ModalSelect>
            </TimeSelectContainer>

            <p>End Time:</p>
            <TimeSelectContainer>
                <ModalSelect name="day" value={endTime.day} onChange={(e) => handleTimeChange(e, 'end')}>
                    {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </ModalSelect>
                <ModalSelect name="hour" value={endTime.hour} onChange={(e) => handleTimeChange(e, 'end')}>
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </ModalSelect>
                <ModalSelect name="minute" value={endTime.minute} onChange={(e) => handleTimeChange(e, 'end')}>
                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </ModalSelect>
            </TimeSelectContainer>

            <SaveButton type="submit">Save</SaveButton>
        </StyledForm>
    );
};

export default EditActivityForm;
