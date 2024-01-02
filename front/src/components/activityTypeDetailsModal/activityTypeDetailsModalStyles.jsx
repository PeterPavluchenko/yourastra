import styled from 'styled-components';

export const DetailsModalWrapper = styled.div`
  position: absolute;
  background-color: #3c4167;
  padding: 20px 30px 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 230px;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;

  svg {
    width: 15px; 
    height: 15px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const TypeDurationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  h2 {
    margin: 20px 8px 0 0;
    font-weight: 300;
    text-align: left;
  }

  p {
    font-size: 18px;
    margin: 25px 0 0 0;
  }
`;