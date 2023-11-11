import styled from "styled-components";

export const MonthsContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const MonthsWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(48, 24px);
`;
export const CircleBase = styled.div`
  margin: 6px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.3s ease-in-out; 

  &:hover {
    transform: scale(2.5);
  }
`;

export const OneMonthPastCircle = styled(CircleBase)`
  background-color: var(--past-circle-orange);
`;

export const ThisMonthCircle = styled(CircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const OneMonthFutureCircle = styled(CircleBase)`
  background-color: rgba(255, 255, 255, .3);
`;
