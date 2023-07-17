import styled from "styled-components";

export const SearchButtonContainer = styled.div`
  position: absolute;
  right: 15px;
`;

export const Button = styled.button`
  width: 48px;
  height: 48px;
  background-color: #007be9;
  border-radius: 50%;

  & > svg {
    position: absolute;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 18px;
  }
`;
