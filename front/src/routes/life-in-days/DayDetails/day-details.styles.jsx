import styled from 'styled-components';

export const DayDetailsWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
`;

export const TitleContainer = styled.div`
    padding: 20px;
    display: flex;
    gap: 25px;
    justify-content: center;
`;

export const DayDetailsContainer = styled.div`
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 1;
  transform: translateX(0);

  &.exit-left {
    opacity: 0;
    transform: translateX(-100%);
  }

  &.exit-right {
    opacity: 0;
    transform: translateX(100%);
  }

  &.enter-left {
    opacity: 0;
    transform: translateX(100%);
  }

  &.enter-right {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

export const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 0 10px;
    transition: filter 0.3s ease-in-out;

    svg {
        width: 15px; 
        height: auto;
    }

    &:hover {
        filter: brightness(120%); 
    }
`;

export const MinutesContainer = styled.div`
    padding: 20px;
`;

export const MinutesWrapper = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(120, 8px);
`;

const MinuteCircleBase = styled.div`
    margin: 2px;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    display: inline-block;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    z-index: 1;
    position: relative;

    &:hover {
        transform: scale(2.5);
        z-index: 2;
    }
`;

export const PastMinuteCircle = styled(MinuteCircleBase)`
    background-color: var(--past-circle-orange); 
`;

export const CurrentMinuteCircle = styled(MinuteCircleBase)`
    background-color: #fff;
    box-shadow: var(--current-circle-glow);
`;

export const FutureMinuteCircle = styled(MinuteCircleBase)`
    background-color: rgba(255, 255, 255, .3);
`;
