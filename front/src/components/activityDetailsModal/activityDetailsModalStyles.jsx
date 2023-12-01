import styled from 'styled-components';

export const DetailsModalWrapper = styled.div`
    position: absolute;
    background-color: #3c4167;
    padding: 20px 30px 50px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;

    h2 {
        font-weight: 300;
        font-size: 25px;
        text-align: left;
    }
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

export const GoBackButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;

  svg {
    width: 18px; 
    height: 18px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.3s ease-in-out;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.3s ease-in-out;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 17px;
  right: 10px;
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

export const StyledForm = styled.form`
  padding-top: 15px;
`;