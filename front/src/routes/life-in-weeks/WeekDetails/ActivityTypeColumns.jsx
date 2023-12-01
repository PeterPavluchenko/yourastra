import React from 'react';

const ActivityTypeColumns = ({ activities }) => {
    const activityTypes = [...new Set(activities.map(activity => activity.type))];

    return (
        <div>
            {activityTypes.map(type => (
                <div key={type}>
                    <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    {/* Render additional details for each activity type if required */}
                </div>
            ))}
        </div>
    );
};

export default ActivityTypeColumns;