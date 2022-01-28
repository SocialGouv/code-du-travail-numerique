import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import React from "react";
import styled from "styled-components";

import { Search } from "../icons/index.js";
import { box, fonts, input, spacings } from "../theme";

export const ComboBox = ({ ...props }) => <Combobox {...props} />;

export const ComboBoxInput = ({ ...props }) => (
  <StyledDiv>
    <StyledComboBoxInput {...props} />
    <StyledIcon>
      <Search />
    </StyledIcon>
  </StyledDiv>
);

const StyledComboBoxInput = styled(({ ...props }) => (
  <ComboboxInput {...props} />
))`
  height: ${input.height};
  padding: 0 5rem 0 ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-color: ${({ invalid, theme }) =>
    invalid ? theme.error : "transparent"};
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
`;

const StyledDiv = styled.span`
  position: relative;
`;

export const ComboBoxList = styled(({ ...props }) => (
  <ComboboxList {...props} />
))`
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
`;

export const ComboBoxPopover = styled(({ ...props }) => (
  <ComboboxPopover {...props} />
))`
  border-radius: ${box.borderRadius};
  color: ${({ theme }) => theme.paragraph};
  border: solid 1px hsla(0, 0%, 0%, 0.25);
  background: hsla(0, 100%, 100%, 0.99);
`;

export const ComboBoxOption = styled(({ ...props }) => (
  <ComboboxOption {...props} />
))`
  color: ${({ theme }) => theme.paragraph};
  font-family: "Open Sans", sans-serif;
  cursor: pointer;

  [aria-selected="true"] {
    background: hsl(211, 10%, 95%);
  }

  :hover {
    background: hsl(211, 10%, 92%);
  }

  [aria-selected="true"]:hover {
    background: hsl(211, 10%, 90%);
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 0;
  right: ${spacings.small};
  width: 100%;
  max-width: ${spacings.large};
  height: 100%;
  max-height: ${spacings.large};
  color: ${({ theme }) => theme.placeholder};
`;
