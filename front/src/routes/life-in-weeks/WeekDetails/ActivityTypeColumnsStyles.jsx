import styled from 'styled-components';

export const ActivityTypesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 35px;
    width: 1008px;
    margin: 35px auto 0;
`;

export const ActivityTypeColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ActivityIcon = styled.div`
    cursor: pointer;
    width: 40px; 
    height: 40px;

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
      filter: brightness(120%);
    }
`;

export const ActivityCirclesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin-top: 20px;
`;

export const ActivityCircle = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--past-circle-orange);
    transition: transform 0.3s ease-in-out;

    &.highlighted {
        filter: brightness(110%);
        box-shadow: 0 0 3.5px 1.75px rgb(223, 116, 82, .075),
                    0 0 6px 3.5px rgb(223, 0, 82, .075),
                    0 0 9px 5px rgb(0, 116, 82, .075);
        transform: scale(1.5);
    }
`;

export const FutureActivityCircle = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .3);    
    transition: transform 0.3s ease-in-out;

    &.highlighted {
        filter: brightness(110%);
        box-shadow: 0 0 3.5px 1.75px rgb(255, 255, 255, .025),
                    0 0 6px 3.5px rgb(255, 0, 255, .025),
                    0 0 9px 5px rgb(0, 255, 255, .025);
        transform: scale(1.5);
    }
`;

export const CurrentActivityCircle = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    background-color: #fff;
    box-shadow: var(--current-circle-glow);

    &.highlighted {
        transform: scale(1.5);
    }
`;