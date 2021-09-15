import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoints } from "../theme.js";
import { Input } from "./Input.js";

export const InputDate = ({ ...props }) => {
  return (
    <StyledInputDate
      type="date"
      placeholder="JJ/MM/AAAA"
      min="1900-01-01"
      max="2099-12-31"
      maxlength="11"
      {...props}
    />
  );
};

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
};

const StyledInputDate = styled(Input)`
  width: 20rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
