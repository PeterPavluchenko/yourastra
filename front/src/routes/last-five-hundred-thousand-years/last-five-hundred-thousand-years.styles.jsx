import styled, { css } from "styled-components";

export const CenturiesContainer = styled.div`
  width: 1200px;
  padding-bottom: 30px;
`;

export const CenturiesWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(95, 12px);
`;

export const CircleBase = styled.div`
  transition: all 0.3s; 
  
  &:hover {
    transform: scale(2.5); 
    z-index: 999;
  }
`;

export const OneCenturyPastCircle = styled(CircleBase)`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: var(--past-circle-orange);
  border-radius: 50%;
  display: inline-block;

  ${props => (props.isHighlighted || props.isBetweenTwoAndFourPointFiveThousandHovered) && css`
    background-color: #c98571;

    &:hover {
      background-color: #d49e8e;
    }
  `}

  ${props => props.isLighter && css`
    background-color: #dea797;

    &:hover {
      background-color: #e6b9ac;
    }
  `}

  ${props => (props.isEvenLighter || props.isBetweenTwoAndFourPointFiveThousandHovered) && css`
    background-color: #e3b7aa;

    &:hover {
      background-color: #e8c8be;
    }
  `}

  ${props => props.isAlmostLightest && css`
    background-color: #e8c6bc;

    &:hover {
      background-color: #edd3cc;
    }
  `}

  ${props => props.isLightest && css`
    background-color: #ebdad5;

    &:hover {
      background-color: #f2e9e6;
    }
  `}
`;

export const ThisCenturyCircleWrapper = styled.div`
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

export const ThisCenturyCircle = styled.div`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: var(--current-circle-glow);
`;

export const OneCenturyFutureCircle = styled(CircleBase)`
  margin: 3px;
  height: 6px;
  width: 6px;
  background-color: white;
  opacity: 0.3;
  border-radius: 50%;
  display: inline-block;

  &:hover {
    background-color: #8087bf;
    opacity: 1;
  }
`;