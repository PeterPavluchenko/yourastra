import styled from "styled-components";
import { Link } from "react-router-dom";

export const WeeksContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const WeeksWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(95, 12px);
`;

export const CircleBase = styled.div`
  margin: 3px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(2.5);
  }
`;

export const OneWeekPastCircle = styled(CircleBase)`
  background-color: var(--past-circle-orange);
`;

export const ThisWeekCircle = styled(CircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const OneWeekFutureCircle = styled(CircleBase)`
  background-color: rgba(255, 255, 255, .3);
`;

export const WeekLink = styled(Link)`
  display: inline-block;
  height: 6px;
  width: 6px;
  margin: 3px;
`;