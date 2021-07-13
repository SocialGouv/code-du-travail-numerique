import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoints } from "../theme.js";
import { Input } from "./Input.js";

export const InputDate = ({ ...props }) => (
  <StyledInputDate type="date" placeholder="JJ/MM/AAAA" {...props} />
);

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
};

const StyledInputDate = styled(Input)`
  width: 20rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
