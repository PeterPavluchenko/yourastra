import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  background-color: #3c4167;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: #4f547f;
  border: 0;
  outline: 0;
  height: 40px;
  border-bottom: 1px solid #66698d;
  font-size: .9rem;
  padding: 8px 15px;
  color: #c8cadf;
  flex-grow: 1;
  display: block;
  margin-top: 10px;
  min-width: 100px;

  &.selected option:first-of-type {
    display: none;
  }
  option:first-of-type {
    color: gray;
  }
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px; 
`;

export const ModalButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #5b84c4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background-color: #41659e;
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #DF7452;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background-color: #e6886b;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  svg {
    width: 15px; 
    height: 15px;
  }

  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(120%);
  }
`;