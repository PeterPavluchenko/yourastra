import styled from "styled-components";

export const YearsContainer = styled.div`
  width: 800px;
  padding-bottom: 30px;
`;

export const YearsWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(10, 80px);
`;

export const OneYearPastCircle = styled.div`
  margin: 20px;
  height: 40px;
  width: 40px;
  background-color: var(--past-circle-orange);
  border-radius: 50%;
  display: inline-block;
`;

export const ThisYearCircleWrapper = styled.div`
  position: relative;
  height: 8px;

  a {
    height: 55px;
    width: 55px;
  }
`;

export const ThisYearCircle = styled.div`
  margin: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: var(--current-circle-glow);
`;

export const OneYearFutureCircle = styled.div`
  margin: 20px;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, .3);
  border-radius: 50%;
  display: inline-block;
`;
