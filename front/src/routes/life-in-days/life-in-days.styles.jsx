import styled from "styled-components";

export const DaysContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const DaysWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(200, 6px);
`;

export const OneDayPastCircle = styled.div`
  margin: 1.5px;
  height: 3px;
  width: 3px;
  background-color: var(--past-circle-orange);
  border-radius: 50%;
  display: inline-block;
`;

export const ThisDayCircleWrapper = styled.div`
  position: relative;
  height: 6px;
  bottom: 11px;

  a {
    height: 6px;
    width: 6px;

    :hover {
        position: relative;
        bottom: 3px;
        left: -13.5px;
    }
  }

  :hover {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
`;

export const ThisDayCircle = styled.div`
  margin: 1.5px;
  height: 3px;
  width: 3px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: var(--current-circle-glow);
`;

export const OneDayFutureCircle = styled.div`
  margin: 1.5px;
  height: 3px;
  width: 3px;
  background-color: white;
  opacity: 0.3;
  border-radius: 50%;
  display: inline-block;
`;
