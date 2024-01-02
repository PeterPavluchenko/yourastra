import React from 'react';
import { 
    DetailsModalWrapper,
    CloseButton,
    TypeDurationWrapper 
} from './activityTypeDetailsModalStyles';

import { ReactComponent as CloseIcon } from "../../assets/close-cross.svg";

const ActivityTypeDetailsModal = ({ onClose, position, type, duration }) => {
    return (
        <DetailsModalWrapper style={{ top: position.top, left: position.left }}>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            <TypeDurationWrapper>
                <h2>{type}:</h2>
                <p>{duration}</p>
            </TypeDurationWrapper>
        </DetailsModalWrapper>
    );
};


export default ActivityTypeDetailsModal;