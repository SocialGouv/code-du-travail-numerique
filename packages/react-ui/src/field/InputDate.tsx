import React from "react";
import styled from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme";
import { DefaultInputProps, INPUT_HEIGHT } from "./Input";

function formatValueToFr(value: string): string {
  const [year, month, days] = value.split("-");
  if (
    !year ||
    year.length !== 4 ||
    !month ||
    month.length !== 2 ||
    !days ||
    days.length !== 2
  )
    return value;
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
    <StyledWrapper isValid={!invalid}>
      <StyledInput
        {...props}
        onChange={onChangeDate}
        type="date"
        ref={ref}
        data-input="true"
        value={formatValueToEn(value)}
      />
    </StyledWrapper>
  );
};

InputDate.propTypes = DefaultInputProps;

const StyledWrapper = styled.div<{ isValid: Boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
  height: ${INPUT_HEIGHT};
  width: fit-content;

  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};

  border-radius: ${box.borderRadius};
  border: 1px solid
    ${({ isFocus, isValid, theme }: any) =>
      isFocus ? theme.secondary : !isValid ? theme.error : "transparent"};

  line-height: inherit;

  appearance: none;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.small};
    padding-right: ${(props: any) =>
      props.hasIcon ? "5rem" : spacings.medium};
  }
`;

const StyledInput = styled.input`
  padding: 0 ${spacings.medium};
  padding-right: ${(props: any) => (props.hasIcon ? "5rem" : spacings.medium)};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  border-color: transparent;
  outline: none;
  border-radius: ${box.borderRadius};
  width: 192px;
  padding-right: 2px;
  color: ${({ theme, value }) => (value ? theme.paragraph : theme.placeholder)};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
