import styled from 'styled-components';

export const WeekDetailsWrapper = styled.div`
    overflow-x: hidden;
    width: 100%;
    margin: 0 auto;
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
    transform: scale(2.5);
  }
`;

export const PastHourCircle = styled(HourCircleBase)`
  background-color: var(--past-circle-orange);
`;

export const CurrentHourCircle = styled(HourCircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const FutureHourCircle = styled(HourCircleBase)`
  background-color: rgba(255, 255, 255, .3);
`;

export const WeekBlocks = styled.div`
    padding: 20px;
    width: 1008px;
    margin: 0 auto;
`;

export const AddNewBlockButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 20px 0;
  transition: filter 0.3s ease-in-out;

  svg {
    width: 30px; // Adjust size as needed
    height: auto;
  }

  &:hover {
    filter: brightness(120%); // Increases brightness by 20% on hover
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
    width: 15px; // Adjust size as needed
    height: auto;
  }

  &:hover {
    filter: brightness(120%); // Increases brightness by 20% on hover
  }
`;



