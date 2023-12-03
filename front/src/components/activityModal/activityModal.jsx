import React, { useState } from 'react';
import { ModalWrapper, ModalSelect, CloseButton, ModalButton, TimeSelectContainer, SaveButton } from './activityModalStyles';
import { ReactComponent as CloseIcon } from "../../assets/close-cross.svg";

const ActivityModal = ({ onClose, position, weekStartDate, onActivitySave }) => {
    const [selected, setSelected] = useState(false);
    const [selectedType, setSelectedType] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [timeSelection, setTimeSelection] = useState({ day: '', hour: '', minute: '' });

    const [endTimeSelection, setEndTimeSelection] = useState({ day: '', hour: '', minute: '' });
    const isEndTimeComplete = endTimeSelection.day && endTimeSelection.hour && endTimeSelection.minute;

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = Array.from({ length: 24 }, (_, i) => i); 
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const handleSelectChange = (e) => {
        setSelected(true);
        setSelectedType(e.target.value);
        e.target.classList.add('selected');
    };

    const handleTimeChange = (e) => {
        setTimeSelection({ ...timeSelection, [e.target.name]: e.target.value });
    };

    const isTimeComplete = timeSelection.day && timeSelection.hour && timeSelection.minute;

    const handleContinue = () => {
        if (activeTab === 1) {
            setActiveTab(2);
        } else if (activeTab === 2 && isTimeComplete) {
            setActiveTab(3);
        }
    };

    const handleEndTimeChange = (e) => {
        setEndTimeSelection({ ...endTimeSelection, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (activeTab === 3 && isEndTimeComplete) {
            const startDate = calculateExactDate(timeSelection.day, timeSelection.hour, timeSelection.minute);
            const endDate = calculateExactDate(endTimeSelection.day, endTimeSelection.hour, endTimeSelection.minute);
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:5000/api/activities/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        type: selectedType,
                        startTime: startDate.toISOString(),
                        endTime: endDate.toISOString(),
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to save activity');
                }
    
                onClose(); 

                if (response.ok) {
                    onActivitySave(); 
                    onClose(); 
                }
            } catch (error) {
                console.error('Error saving activity:', error);
            }
        }
    };

    const getFilteredDays = () => {
        const startIndex = daysOfWeek.indexOf(timeSelection.day);
        return daysOfWeek.slice(startIndex);
    };

    const getFilteredHours = () => {
        if (endTimeSelection.day === timeSelection.day) {
            return hours.filter(hour => hour >= parseInt(timeSelection.hour));
        }
        return hours;
    };

    const getFilteredMinutes = () => {
        if (endTimeSelection.day === timeSelection.day && endTimeSelection.hour === timeSelection.hour) {
            return minutes.filter(minute => parseInt(minute) >= parseInt(timeSelection.minute));
        }
        return minutes;
    };

    const calculateExactDate = (selectedDay, selectedHour, selectedMinute) => {
        const dayIndex = daysOfWeek.indexOf(selectedDay);
        const exactDate = new Date(weekStartDate);
    
        exactDate.setDate(weekStartDate.getDate() + dayIndex);
        exactDate.setHours(selectedHour, selectedMinute, 0, 0);
    
        const timezoneOffset = exactDate.getTimezoneOffset() * 60000;
    
        exactDate.setTime(exactDate.getTime() - timezoneOffset);
    
        return exactDate;
    };

    return (
        <ModalWrapper style={{ top: position.top, left: position.left }}>
            <CloseButton>
                <CloseIcon onClick={onClose} />
            </CloseButton>
            {activeTab === 1 && (
                <>
                    <p>Select activity</p>
                    <ModalSelect defaultValue="" onChange={handleSelectChange}>
                        <option value="" disabled hidden>Select something</option>
                        <option value="sleep">Sleep</option>
                        <option value="running">Running</option>
                        <option value="work">Work</option>
                        <option value="vocabulary">Vocabulary</option>
                        <option value="project">Project</option>
                    </ModalSelect>
                    {selected && <ModalButton onClick={handleContinue}>Continue</ModalButton>}
                </>
            )}
            {activeTab === 2 && (
                <>
                    <p>When did you start?</p>
                    <ModalSelect name="day" value={timeSelection.day} onChange={handleTimeChange} defaultValue="">
                        <option value="" disabled hidden>Select day</option>
                        {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                    </ModalSelect>
                    <TimeSelectContainer>
                        <ModalSelect name="hour" value={timeSelection.hour} onChange={handleTimeChange} defaultValue="">
                            <option value="" disabled hidden>Hour</option>
                            {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                        </ModalSelect>
                        <ModalSelect name="minute" value={timeSelection.minute} onChange={handleTimeChange} defaultValue="">
                            <option value="" disabled hidden>Minute</option>
                            {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                        </ModalSelect>
                    </TimeSelectContainer>
                    {isTimeComplete && <ModalButton onClick={handleContinue}>Continue</ModalButton>}
                </>
            )}
            {activeTab === 3 && (
                <>
                    <p>When did you finish?</p>
                    <ModalSelect name="day" value={endTimeSelection.day} onChange={handleEndTimeChange} defaultValue="">
                        <option value="" disabled hidden>Select day</option>
                        {getFilteredDays().map(day => <option key={day} value={day}>{day}</option>)}
                    </ModalSelect>
                    <TimeSelectContainer>
                        <ModalSelect name="hour" value={endTimeSelection.hour} onChange={handleEndTimeChange} defaultValue="">
                            <option value="" disabled hidden>Hour</option>
                            {getFilteredHours().map(hour => <option key={hour} value={hour}>{hour}</option>)}
                        </ModalSelect>
                        <ModalSelect name="minute" value={endTimeSelection.minute} onChange={handleEndTimeChange} defaultValue="">
                            <option value="" disabled hidden>Minute</option>
                            {getFilteredMinutes().map(minute => <option key={minute} value={minute}>{minute}</option>)}
                        </ModalSelect>
                    </TimeSelectContainer>
                    {isEndTimeComplete && <SaveButton onClick={handleSave}>Save</SaveButton>}
                </>
            )}
        </ModalWrapper>
    );
};

export default ActivityModal;