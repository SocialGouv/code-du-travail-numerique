import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoints } from "../theme.js";
import { Input } from "./Input.js";

export const InputDate = ({ onChange, value, invalid, ...props }) => {
  const [date, setDate] = React.useState(value ?? "");
  const [isValid, setIsValid] = React.useState(true ?? !invalid);

  const onChangeDate = (event) => {
    const value = event.target.value;
    const inputType = event.nativeEvent.inputType;
    if (
      isNaN(Number(value.replaceAll("/", ""))) &&
      inputType !== "deleteContentBackward"
    )
      return;
    if (
      (value.length === 2 || value.length === 5) &&
      inputType !== "deleteContentBackward"
    ) {
      setDate(value + "/");
    } else if (value.length <= 10) {
      setDate(value);
    }
    const splitParts = value.split("/");
    const day = isNaN(Number(splitParts[0])) ? null : Number(splitParts[0]);
    const month = isNaN(Number(splitParts[1])) ? null : Number(splitParts[1]);
    const year = isNaN(Number(splitParts[2])) ? null : Number(splitParts[2]);
    const isYearValid = year && year >= 1900 && year <= 2100;
    const isMonthValid = month && month >= 1 && month <= 12;
    const isDayValid = day && day >= 1 && day <= 31;
    const isValid = isYearValid && isMonthValid && isDayValid;
    setIsValid(isValid);
    if (onChange) onChange(value);
  };

  return (
    <StyledInputDate
      value={date}
      invalid={!isValid}
      onChange={onChangeDate}
      placeholder="jj/mm/aaaa"
      {...props}
    />
  );
};

InputDate.propTypes = {
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const StyledInputDate = styled(Input)`
  width: 20rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
