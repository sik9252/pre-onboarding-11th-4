import styled from "styled-components";

export const SearchResultContainer = styled.div`
  max-width: 1024px;
  max-height: 600px;
  overflow-y: scroll;
  margin: 10px auto 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;

  & > div:nth-child(1) {
    font-size: 14px;
    color: #a6afb7;
    margin-bottom: 10px;
    margin-left: 5px;
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  & > svg {
    color: #a6afb7;
    margin-right: 8px;
    margin-left: 5px;
  }

  &.selected {
    background-color: #eeeeee;
    border-radius: 10px;
  }

  &:hover {
    background-color: #dddddd;
    border-radius: 10px;
  }
`;
