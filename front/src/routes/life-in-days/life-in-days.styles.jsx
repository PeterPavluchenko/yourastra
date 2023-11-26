import styled from "styled-components";
import { Link } from "react-router-dom";

export const DaysContainer = styled.div`
  width: 1560px;
  padding-bottom: 30px;

  @media (max-width: 1640px) {
    width: 1200px;
  }

  @media (max-width: 1329px) {
    width: 1080px;
  }

  @media (max-width: 1179px) {
    width: 960px;
  }

  @media (max-width: 1024px) {
    width: 780px;
  }

  @media (max-width: 870px) {
    width: 660px;
  }

  @media (max-width: 768px) {
    width: 600px;
  }

  @media (max-width: 680px) {
    width: 480px;
  }

  @media (max-width: 580px) {
    width: 360px;
  }

  @media (max-width: 480px) {
    width: 240px;
  }
`;

export const DaysWrapper = styled.div`
  display: inline-grid;

  grid-template-columns: repeat(260, 6px);

  @media (max-width: 1640px) {
    grid-template-columns: repeat(200, 6px);
  }

  @media (max-width: 1329px) {
    grid-template-columns: repeat(180, 6px);
  }

  @media (max-width: 1179px) {
    grid-template-columns: repeat(160, 6px);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(130, 6px);
  }

  @media (max-width: 870px) {
    grid-template-columns: repeat(110, 6px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(100, 6px);
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(80, 6px);
  }

  @media (max-width: 580px) {
    grid-template-columns: repeat(60, 6px);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(40, 6px);
  }
`;

const CircleBase = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  display: block; /* Fill the container (DayLink) */
`;

export const OneDayPastCircle = styled(CircleBase)`
  background-color: var(--past-circle-orange);
`;

export const ThisDayCircle = styled(CircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const OneDayFutureCircle = styled(CircleBase)`
  background-color: rgba(255, 255, 255, .3);
`;

export const DayLink = styled(Link)`
  margin: 1.5px;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  display: inline-block; 
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(2.5);
  }
`;

export const DayPlaceholder = styled.div`
  margin: 1.5px;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.type === 'past') return 'var(--past-circle-orange)';
    if (props.type === 'present') return '#fff';
    return 'rgba(255, 255, 255, .3)';
  }};
  box-shadow: ${props => props.type === 'present' ? 'var(--current-circle-glow)' : 'none'};
  display: inline-block;
`;

