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
import { box, colors, fonts, spacings } from "../theme";

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
  height: 5.4rem;
  width: 100%;
  padding: 0 4rem 0 ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  background: ${({ theme }) => theme.white};
  border: 1px solid
    ${({ invalid, theme }) => (invalid ? theme.error : "transparent")};
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
  background: ${colors.bgPrimary};
  border: ${({ theme }) => box.border(theme.border)};
  max-height: 400px;
  overflow-y: auto;
  margin-top: ${spacings.small};
`;

export const ComboBoxOption = styled(({ ...props }) => (
  <ComboboxOption {...props} />
))`
  color: ${({ theme }) => theme.paragraph};
  font-family: "Open Sans", sans-serif;
  cursor: pointer;

  &:hover,
  &[aria-selected="true"] {
    background: ${colors.bgTertiary};
  }

  & + & {
    border-top: ${({ theme }) => box.border(theme.border)};
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
