import React from "react";
import styled from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme";
import { DefaultInputProps, INPUT_HEIGHT } from "./Input";

function addSlashIfNeeded(newValue) {
  if (newValue.length === 2 || newValue.length === 5) {
    newValue += "/";
  }
  return newValue;
}

export const InputDate = ({ value, onChange, invalid, ...props }) => {
  const [date, setDate] = React.useState(value ?? "");
  const [isValid, setIsValid] = React.useState(true);
  const [isFocus, setIsFocus] = React.useState(false);

  const onChangeDate = (event) => {
    const currentSelectionStart = event.target.selectionStart;
    const currentSelectionEnd = event.target.selectionEnd;
    const value = event.target.value;
    const inputType = event.nativeEvent.inputType;
    if (inputType === "deleteContentBackward") {
      setDate(value);
      return;
    }
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 8) {
      let newValue = "";
      for (let i = 0; i < onlyNumbers.length; i++) {
        newValue = addSlashIfNeeded(newValue);

        newValue += onlyNumbers[i];
      }
      newValue = addSlashIfNeeded(newValue);
      setDate(newValue);
      setIsValid(isValidDate(newValue));
      if (onChange) onChange(newValue);
      // hack pour que le cursor ne se déplace pas si on édite le champ
      setTimeout(() => {
        if (currentSelectionEnd < newValue.length - 1)
          event.target.setSelectionRange(
            currentSelectionStart,
            currentSelectionEnd
          );
      }, 0);
    }
  };

  const onChangeDatePicker = (event) => {
    const date = event.target.value;
    if (date && date !== "") {
      const realDate = date.split("-");
      const year = realDate[0] ?? "";
      const month = realDate[1] ?? "";
      const day = realDate[2] ?? "";
      const newValue = `${day}/${month}/${year}`;
      setDate(newValue);
      setIsValid(true);
      if (onChange) onChange(newValue);
    }
  };

  const formatDate = () => {
    const splitParts = date.split("/");
    const day = splitParts[0] ?? "";
    const month = splitParts[1] ?? "";
    const year = splitParts[2] ?? "";
    return `${year}-${month}-${day}`;
  };

  const isValidDate = (date) => {
    if (date && date.length === 10) {
      const splitParts = date.split("/");
      const day = isNaN(Number(splitParts[0])) ? null : Number(splitParts[0]);
      const month = isNaN(Number(splitParts[1])) ? null : Number(splitParts[1]);
      const year = isNaN(Number(splitParts[2])) ? null : Number(splitParts[2]);
      const isYearValid = year && year >= 1900 && year <= 2100;
      const isMonthValid = month && month >= 1 && month <= 12;
      const isDayValid = day && day >= 1 && day <= 31;
      const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
      return isYearValid && isMonthValid && isDayValid && isValidDate;
    }
    return true;
  };

  const onBlur = () => {
    setIsFocus(false);
    if (date.length !== 10) {
      setIsValid(false);
    }
  };

  return (
    <StyledWrapper
      isFocus={isFocus}
      isValid={invalid === true ? false : invalid === false ? true : isValid}
    >
      <StyledInput
        value={date}
        onChange={onChangeDate}
        placeholder="jj/mm/aaaa"
        onFocus={() => setIsFocus(true)}
        onBlur={onBlur}
        {...props}
      />
      <StyledDiv>
        <StyledDateWrapper>
          <SvgDatePicker width="100%" height="100%" />
        </StyledDateWrapper>
        <StyledDatePicker
          type="date"
          aria-disabled={!isValid}
          tabIndex={-1}
          min="1900-01-01"
          max="2100-01-01"
          maxlength="11"
          value={formatDate()}
          onChange={onChangeDatePicker}
        />
      </StyledDiv>
    </StyledWrapper>
  );
};

InputDate.propTypes = DefaultInputProps;

const StyledWrapper = styled.div`
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
    ${({ isFocus, isValid, theme }) =>
      isFocus ? theme.secondary : !isValid ? theme.error : "transparent"};

  line-height: inherit;

  appearance: none;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.small};
    padding-right: ${(props) => (props.hasIcon ? "5rem" : spacings.medium)};
  }
`;

const StyledInput = styled.input`
  padding: 0 ${spacings.medium};
  padding-right: ${(props) => (props.hasIcon ? "5rem" : spacings.medium)};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  border-color: transparent;
  outline: none;
  border-radius: ${box.borderRadius};
  width: 160px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 100%;
`;

const StyledDatePicker = styled.input`
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const StyledDateWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SvgDatePicker = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.947 7.601h1.601c1.472 0 2.521 1.198 2.521 2.669v2.306l-.001 10.392c0 1.472-1.049 2.669-2.521 2.669H8.669A2.672 2.672 0 0 1 6 22.967l.001-12.697a2.672 2.672 0 0 1 2.67-2.669h1.331V6h.999v1.601H20V6h.947v1.601zm1.6 17.036c.883 0 1.454-.786 1.454-1.67v-10.33h-17L7 22.967c0 .884.785 1.67 1.668 1.67h13.879zm-15.548-13h17.002l.001-1.367c0-.883-.57-1.601-1.453-1.601h-1.6v1.068H20V8.669h-9v1.068h-1V8.669H8.669C7.786 8.669 7 9.387 7 10.27v1.367zm9.677 6.277h-2.135a1.07 1.07 0 0 1-1.068-1.068v-2.135a1.07 1.07 0 0 1 1.068-1.068h2.135a1.07 1.07 0 0 1 1.068 1.068v2.135a1.07 1.07 0 0 1-1.068 1.068zm0-3.203h-2.135v2.135h2.136v-2.135zm3.203 3.203h2.135a1.07 1.07 0 0 0 1.068-1.068v-2.135a1.07 1.07 0 0 0-1.068-1.068H19.88a1.07 1.07 0 0 0-1.068 1.068v2.135a1.07 1.07 0 0 0 1.068 1.068zm0-3.203h2.135l.001 2.135H19.88v-2.135zm-8.54 8.541H9.204a1.07 1.07 0 0 1-1.068-1.068v-2.135a1.07 1.07 0 0 1 1.068-1.068h2.135a1.07 1.07 0 0 1 1.068 1.068v2.135a1.07 1.07 0 0 1-1.068 1.068zm0-3.203H9.204v2.135h2.136l-.001-2.135zm3.202 3.203h2.135a1.07 1.07 0 0 0 1.068-1.068v-2.135a1.07 1.07 0 0 0-1.068-1.068h-2.135a1.07 1.07 0 0 0-1.068 1.068v2.135a1.07 1.07 0 0 0 1.068 1.068zm0-3.203h2.135l.001 2.135h-2.136v-2.135zm7.473 3.203H19.88a1.07 1.07 0 0 1-1.068-1.068v-2.135a1.07 1.07 0 0 1 1.068-1.068h2.135a1.07 1.07 0 0 1 1.068 1.068v2.135a1.07 1.07 0 0 1-1.068 1.068zm0-3.203H19.88v2.135h2.136v-2.135z"
      fill="currentColor"
    />
  </svg>
);
