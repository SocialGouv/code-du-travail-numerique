import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

function ErrorField({ name }) {
  return (
    <Field
      name={name}
      subscription={{ error: true, touched: true, submitFailed: true }}
      render={({ meta: { error, submitFailed } }) =>
        submitFailed && error ? <Error>{error}</Error> : null
      }
    />
  );
}
ErrorField.propTypes = {
  name: PropTypes.string.isRequired
};

function ErrorComputedField({ name }) {
  return (
    <Field
      name={name}
      render={({ meta: { error } }) => (error ? <Error>{error}</Error> : null)}
    />
  );
}
ErrorComputedField.propTypes = {
  name: PropTypes.string.isRequired
};

const Error = styled.div`
  margin: ${theme.spacing.small} 0 ${theme.spacing.base};
  color: ${({ theme }) => theme.errorText};
  font-weight: 600;
  font-size: ${theme.fonts.sizeSmall};
`;

const InlineError = props => <Error {...props} as="span" />;

export { ErrorField, ErrorComputedField, Error, InlineError };
