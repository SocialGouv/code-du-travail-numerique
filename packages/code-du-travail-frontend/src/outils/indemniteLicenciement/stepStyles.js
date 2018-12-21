import styled from "styled-components";

export const Input = styled.input`
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  width: ${props => `${parseFloat(props.size, 10)}em` || "auto"};
`;

export const Label = styled.label`
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  margin-right: 2em;
  display: flex;
  align-items: center;
`;

export const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
