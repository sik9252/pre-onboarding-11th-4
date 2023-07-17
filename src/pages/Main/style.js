import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  padding: 50px 50px;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: 700;

  & > div:nth-child(1) {
    padding: 5px 0;
  }

  & > div:nth-child(2) {
    padding: 5px 0;
    margin-bottom: 20px;
  }
`;
