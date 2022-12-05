import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ScreenReaderOnly } from "../ScreenReaderOnly";
import { Text } from "../Text";
import { box, breakpoints, fonts, spacings } from "../theme.js";
import { debounce } from "../utils/debounce";

export const Textarea = ({
  name,
  maxLength,
  onChange,
  showCounter,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [a11yCounter, setA11Counter] = useState(maxLength);
  const hasOverflowed = maxLength ? maxLength - value.length <= 0 : false;

  const a11yCounterUpdate = useMemo(() => debounce(setA11Counter, 500), [
    setA11Counter,
  ]);

  useEffect(() => {
    return () => {
      if (!hasOverflowed) return;
      a11yCounterUpdate.cancel();
    };
  }, []);

  const changeHandler = useCallback(
    (event) => {
      setValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
      a11yCounterUpdate(maxLength - event.target.value.length);
    },
    [a11yCounterUpdate]
  );
  return (
    <>
      <StyledTextarea
        name={name}
        onChange={changeHandler}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && showCounter && (
        <div>
          <Text
            fontSize="tiny"
            variant={hasOverflowed ? "error" : "placeholder"}
          >
            {Math.max(0, maxLength - value.length)} caractères restants
          </Text>
          <ScreenReaderOnly role="status">
            {a11yCounter} caractères restants
          </ScreenReaderOnly>
        </div>
      )}
    </>
  );
};

Textarea.propTypes = {
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showCounter: PropTypes.bool,
};

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
