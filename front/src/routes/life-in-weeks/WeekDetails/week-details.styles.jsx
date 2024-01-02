import styled from 'styled-components';
import { ReactComponent as SleepIcon } from "../../../assets/sleep-circle.svg";
import { ReactComponent as RunningIcon } from "../../../assets/running-circle.svg";
import { ReactComponent as WorkIcon } from "../../../assets/work-circle.svg";
import { ReactComponent as VocabIcon } from "../../../assets/vocab-circle.svg";
import { ReactComponent as ProjectIcon } from "../../../assets/project-circle.svg";
import { ReactComponent as SwimmingIcon } from "../../../assets/swimming-circle.svg";
import { ReactComponent as ResistanceIcon } from "../../../assets/resistance-circle.svg";
import { ReactComponent as StretchingIcon } from "../../../assets/stretching-circle.svg";
import { ReactComponent as FriendsIcon } from "../../../assets/friends-circle.svg";

import { ReactComponent as SleepIconCurrent } from "../../../assets/circle-icons-current/sleep-circle-current.svg";
import { ReactComponent as RunningIconCurrent } from "../../../assets/circle-icons-current/running-circle-current.svg";
import { ReactComponent as WorkIconCurrent } from "../../../assets/circle-icons-current/work-circle-current.svg";
import { ReactComponent as VocabIconCurrent } from "../../../assets/circle-icons-current/vocab-circle-current.svg";
import { ReactComponent as ProjectIconCurrent } from "../../../assets/circle-icons-current/project-circle-current.svg";
import { ReactComponent as SwimmingIconCurrent } from "../../../assets/circle-icons-current/swimming-circle-current.svg";
import { ReactComponent as ResistanceIconCurrent } from "../../../assets/circle-icons-current/resistance-circle-current.svg";
import { ReactComponent as StretchingIconCurrent } from "../../../assets/circle-icons-current/stretching-circle-current.svg";
import { ReactComponent as FriendsIconCurrent } from "../../../assets/circle-icons-current/friends-circle-current.svg";

import { ReactComponent as SleepIconFuture } from "../../../assets/circle-icons-future/sleep-circle-future.svg";
import { ReactComponent as RunningIconFuture } from "../../../assets/circle-icons-future/running-circle-future.svg";
import { ReactComponent as WorkIconFuture } from "../../../assets/circle-icons-future/work-circle-future.svg";
import { ReactComponent as VocabIconFuture } from "../../../assets/circle-icons-future/vocab-circle-future.svg";
import { ReactComponent as ProjectIconFuture } from "../../../assets/circle-icons-future/project-circle-future.svg";
import { ReactComponent as SwimmingIconFuture } from "../../../assets/circle-icons-future/swimming-circle-future.svg";
import { ReactComponent as ResistanceIconFuture } from "../../../assets/circle-icons-future/resistance-circle-future.svg";
import { ReactComponent as StretchingIconFuture } from "../../../assets/circle-icons-future/stretching-circle-future.svg";
import { ReactComponent as FriendsIconFuture } from "../../../assets/circle-icons-future/friends-circle-future.svg";

export const WeekDetailsWrapper = styled.div`
    overflow-x: hidden;
    width: 100%;
    margin: 0 auto;
    height: 85vh;
`;

export const WeekDetailsContainer = styled.div`
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 1;
  transform: translateX(0);

  &.exit-left {
    opacity: 0;
    transform: translateX(-100%);
  }

  &.exit-right {
    opacity: 0;
    transform: translateX(100%);
  }

  &.enter-left {
    opacity: 0;
    transform: translateX(100%);
  }

  &.enter-right {
    opacity: 0;
    transform: translateX(-100%);
  }
`;


export const HoursContainer = styled.div`
    padding: 20px;
    width: 1008px;
    margin: 0 auto;
`;

export const TitleContainer = styled.div`
    padding: 20px;
    display: flex;
    gap: 25px;
    justify-content: center;
`;

export const HoursWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(84, 12px); 
`;

const HourCircleBase = styled.div`
  margin: 3px;
  height: 6px; 
  width: 6px;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(2);
  }

  &.highlighted {
    transform: scale(1.5);
  }
`;

export const PastHourCircle = styled(HourCircleBase)`
  background-color: var(--past-circle-orange);

  &.highlighted {
    filter: brightness(110%);
    box-shadow: 0 0 3.5px 1.75px rgb(223, 116, 82, .075),
                0 0 6px 3.5px rgb(223, 0, 82, .075),
                0 0 9px 5px rgb(0, 116, 82, .075);
  }
`;

export const CurrentHourCircle = styled(HourCircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const FutureHourCircle = styled(HourCircleBase)`
  background-color: rgba(255, 255, 255, .3);

  &.highlighted {
    filter: brightness(110%);
    box-shadow: 0 0 3.5px 1.75px rgb(255, 255, 255, .025),
                0 0 6px 3.5px rgb(255, 0, 255, .025),
                0 0 9px 5px rgb(0, 255, 255, .025);
  }
`;

export const WeekItems = styled.div`
    padding: 20px;
    max-width: 1008px;
    margin: 25px auto 0;
    display: flex; 
    align-items: center; 
    gap: 10px; 
    flex-wrap: wrap; 
    justify-content: start;
    overflow-x: hidden;
`;



export const AddNewBlockButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.3s ease-in-out;
  margin-bottom: 4px;

  svg {
    width: 30px;
    height: auto;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 0 10px;
    transition: filter 0.3s ease-in-out;

    svg {
        width: 15px;
        height: auto;
    }

    &:hover {
      filter: brightness(120%);
    }
`;

const boxShadowStyle = `
  box-shadow: 
    0 0 3.5px 1.75px rgba(255, 255, 255, 0.3),
    0 0 6px 3.5px rgba(255, 0, 255, 0.3),
    0 0 9px 5px rgba(0, 255, 255, 0.3);
`;

const iconStyle = ({ isCurrent, isFuture }) => `
  width: 30px; 
  height: 30px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    transform: scale(1.2);
    filter: brightness(110%);
    ${isCurrent ? '' : 
      isFuture ? highlightedFutureShadow : 
      highlightedPastShadow}
  }
`;

const highlightedPastShadow = `
  box-shadow: 0 0 3.5px 1.75px rgb(223, 116, 82, .075),
              0 0 6px 3.5px rgb(223, 0, 82, .075),
              0 0 9px 5px rgb(0, 116, 82, .075);
`;

const highlightedFutureShadow = `
  box-shadow: 0 0 3.5px 1.75px rgba(255, 255, 255, 0.025),
              0 0 6px 3.5px rgba(255, 0, 255, 0.025),
              0 0 9px 5px rgba(0, 255, 255, 0.025);
`;

const highlightedCurrentShadow = `
  box-shadow: var(--current-circle-glow);
`;

const highlightedStyle = (isCurrent, isFuture) => {
  if (isCurrent) {
    return `
      transform: scale(1.2);
      filter: brightness(110%);
      ${highlightedCurrentShadow}
    `;
  } else if (isFuture) {
    return `
      transform: scale(1.2);
      filter: brightness(110%);
      ${highlightedFutureShadow}
    `;
  } else {
    return `
      transform: scale(1.2);
      filter: brightness(110%);
      ${highlightedPastShadow}
    `;
  }
};

export const SleepIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = SleepIconCurrent;
  } else if (isFuture) {
      IconComponent = SleepIconFuture;
  } else {
      IconComponent = SleepIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;


export const RunningIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = RunningIconCurrent;
  } else if (isFuture) {
      IconComponent = RunningIconFuture;
  } else {
      IconComponent = RunningIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const WorkIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = WorkIconCurrent;
  } else if (isFuture) {
      IconComponent = WorkIconFuture;
  } else {
      IconComponent = WorkIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const VocabIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = VocabIconCurrent;
  } else if (isFuture) {
      IconComponent = VocabIconFuture;
  } else {
      IconComponent = VocabIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const ProjectIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = ProjectIconCurrent;
  } else if (isFuture) {
      IconComponent = ProjectIconFuture;
  } else {
      IconComponent = ProjectIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const SwimmingIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = SwimmingIconCurrent;
  } else if (isFuture) {
      IconComponent = SwimmingIconFuture;
  } else {
      IconComponent = SwimmingIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const ResistanceIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = ResistanceIconCurrent;
  } else if (isFuture) {
      IconComponent = ResistanceIconFuture;
  } else {
      IconComponent = ResistanceIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const StretchingIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = StretchingIconCurrent;
  } else if (isFuture) {
      IconComponent = StretchingIconFuture;
  } else {
      IconComponent = StretchingIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;

export const FriendsIconStyle = styled(({ isCurrent, isFuture, highlighted, ...props }) => {
  let IconComponent;
  if (isCurrent) {
      IconComponent = FriendsIconCurrent;
  } else if (isFuture) {
      IconComponent = FriendsIconFuture;
  } else {
      IconComponent = FriendsIcon;
  }

  return <IconComponent {...props} />;
})`
  ${props => iconStyle(props)}
  ${({ isCurrent }) => isCurrent && boxShadowStyle}
  ${({ highlighted, isCurrent, isFuture }) => highlighted && highlightedStyle(isCurrent, isFuture)}
`;