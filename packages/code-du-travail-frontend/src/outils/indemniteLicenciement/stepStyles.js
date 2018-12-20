import styled from "styled-components";

export const inputStyle = {
  padding: 0,
  fontSize: "1.5rem",
  textAlign: "center"
};

export const Input = styled.input`
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  width: ${props => `${props.size}em` || "auto"};
`;

export const InputSmall = styled(Input)`
  width: 12rem;
`;

export const labelStyle = {
  ...inputStyle,
  marginRight: "2em",
  display: "flex",
  alignItems: "center"
};

export const Label = styled.label`
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  margin-right: 2em;
  display: flex;
  align-items: center;
`;

export const radioContainerStyle = {
  display: "flex",
  justifyContent: "flex-start"
};

export const Radio = styled.input`
  display: flex;
  justify-content: flex-start;
`;

export const headStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
