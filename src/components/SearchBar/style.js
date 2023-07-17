import styled from "styled-components";

export const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;

  & > svg {
    position: absolute;
    left: 20px;
    color: #a6afb7;
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 18px;

  border-radius: 42px;
  border: 2px solid #ffffff;
  padding: 25px 10px 25px 45px;

  &::placeholder {
    color: #a6afb7;
  }
`;
