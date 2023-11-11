import React from 'react';
import { useParams } from 'react-router-dom';

const DayDetails = ({ user }) => {
    const { dayIndex } = useParams();
    const userBirthDate = user ? new Date(user.birthday) : new Date("1997-08-26");

    const getDayDate = (index) => {
        const birthDate = new Date(userBirthDate);
        const dayDate = new Date(birthDate.getTime());
        dayDate.setDate(birthDate.getDate() + index);

        return dayDate;
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    const adjustedDayIndex = parseInt(dayIndex, 10) - 1;
    const dayDate = getDayDate(adjustedDayIndex);
    const dateStr = formatDate(dayDate);

    return (
        <div>
            <h1>Day {adjustedDayIndex + 1}: {dateStr}</h1>
        </div>
    );
};

export default DayDetails;
