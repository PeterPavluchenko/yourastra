import styled from "styled-components";

export const MonthsContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const MonthsWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(48, 24px);
`;

export const OneMonthPastCircle = styled.div`
  margin: 6px;
  height: 12px;
  width: 12px;
  background-color: var(--past-circle-orange);
  border-radius: 50%;
  display: inline-block;
`;

export const ThisMonthCircleWrapper = styled.div`
  position: relative;
  height: 8px;

  a {
    height: 30px;
    width: 30px;
    :hover {
      position: relative;
      bottom: 9px;
      left: -9px;
    }
  }

  :hover {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
`;

export const ThisMonthCircle = styled.div`
  margin: 6px;
  height: 12px;
  width: 12px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: var(--current-circle-glow);
`;

export const OneMonthFutureCircle = styled.div`
  margin: 6px;
  height: 12px;
  width: 12px;
  background-color: white;
  opacity: 0.3;
  border-radius: 50%;
  display: inline-block;
`;
