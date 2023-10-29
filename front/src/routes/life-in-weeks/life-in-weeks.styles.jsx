import styled from "styled-components";

export const WeeksContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const WeeksWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(95, 12px);
`;

export const OneWeekPastCircle = styled.div`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: var(--past-circle-orange);
  border-radius: 50%;
  display: inline-block;
`;

export const ThisWeekCircleWrapper = styled.div`
  position: relative;
  height: 6px;
  bottom: 5px;

  a {
    height: 12px;
    width: 12px;
    
    :hover {
        position: relative;
        bottom: 7px;
        left: -12px;
    }
  }

  :hover {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
`;

export const ThisWeekCircle = styled.div`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: var(--current-circle-glow);
`;

export const OneWeekFutureCircle = styled.div`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: white;
  opacity: 0.3;
  border-radius: 50%;
  display: inline-block;
`;
