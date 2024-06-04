import React from "react";
import styled from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme";
import { DefaultInputProps, INPUT_HEIGHT } from "./Input";

function formatValueToFr(value: string): string {
  const [year, month, days] = value.split("-");
  return `${days}/${month}/${year}`;
}

function formatValueToEn(value: string): string {
  if (!value) return value;
  const [days, month, year] = value.split("/");
  return `${year}-${month}-${days}`;
}

export const InputDate = ({ value, onChange, invalid, ref, ...props }: any) => {
  const onChangeDate = (event: any) => {
    if (onChange) {
      onChange(formatValueToFr(event.target.value));
    }
  };
  return (
    <StyledInput
      {...props}
      isValid={!invalid}
      onChange={onChangeDate}
      type="date"
      ref={ref}
      data-input="true"
      defaultValue={formatValueToEn(value)}
    />
  );
};

InputDate.propTypes = DefaultInputProps;

const StyledInput = styled.input<{ isValid: Boolean }>`
  padding: 0 ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  border: 1px solid
    ${({ isFocus, isValid, theme }: any) =>
      isFocus ? theme.secondary : !isValid ? theme.error : "transparent"};
  border-radius: ${box.borderRadius};
  outline: none;
  width: 192px;
  height: ${INPUT_HEIGHT};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
