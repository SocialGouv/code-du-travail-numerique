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
  const [date, setDate] = React.useState(formatValueToEn(value ?? ""));
  const [isValid, setIsValid] = React.useState(true);

  const onChangeDate = (event: any) => {
    if (!event.target.value) return;
    const value: string = formatValueToFr(event.target.value);
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 8) {
      setDate(formatValueToEn(value));
      setIsValid(isValidDate(value));
      if (onChange) onChange(value);
    }
  };

  const isValidDate = (date: string): boolean => {
    if (date && date.length === 10) {
      const splitParts = date.split("/");
      const day = isNaN(Number(splitParts[0])) ? null : Number(splitParts[0]);
      const month = isNaN(Number(splitParts[1])) ? null : Number(splitParts[1]);
      const year = isNaN(Number(splitParts[2])) ? null : Number(splitParts[2]);
      const isYearValid = !!year && year >= 1900 && year <= 2100;
      const isMonthValid = !!month && month >= 1 && month <= 12;
      const isDayValid = !!day && day >= 1 && day <= 31;
      const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
      return isYearValid && isMonthValid && isDayValid && isValidDate;
    }
    return false;
  };

  return (
    <StyledWrapper
      isValid={invalid === true ? false : invalid === false ? true : isValid}
    >
      <StyledInput
        {...props}
        onChange={onChangeDate}
        type="date"
        ref={ref}
        data-input="true"
        value={date}
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
