import styled from "styled-components";

export const YearsContainer = styled.div`
  width: 800px;
  padding-bottom: 30px;
`;

export const YearsWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(10, 80px);
`;

export const CircleBase = styled.div`
  margin: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.3s; 
  
  &:hover {
    transform: scale(1.5); 
  }
`;

export const OneYearPastCircle = styled(CircleBase)`
  background-color: var(--past-circle-orange);
`;

export const ThisYearCircleWrapper = styled.div`
  position: relative;
`;

export const ThisYearCircle = styled(CircleBase)`
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const OneYearFutureCircle = styled(CircleBase)`
  background-color: rgba(255, 255, 255, .3);
`;
