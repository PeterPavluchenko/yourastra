import styled from "styled-components";
import { Link } from "react-router-dom";

export const DaysContainer = styled.div`
  width: 1560px;
  padding-bottom: 30px;
`;

export const DaysWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(260, 6px);
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