import { theme } from "@socialgouv/react-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

function ErrorField({ name }) {
  return (
    <Field
      name={name}
      subscription={{ error: true, submitFailed: true, touched: true }}
      render={({ meta: { error, submitFailed } }) => {
        if (!submitFailed || !error) {
          return null;
        }
        if (typeof error === "string") {
          return <Error>{error}</Error>;
        }
        return error;
      }}
    />
  );
}
ErrorField.propTypes = {
  name: PropTypes.string.isRequired,
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
  name: PropTypes.string.isRequired,
};

const Error = styled.div`
  margin: ${theme.spacings.small} 0 ${theme.spacings.base};
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  font-size: ${theme.fonts.sizes.small};
`;

const InlineError = (props) => <Error {...props} as="span" />;

export { ErrorField, ErrorComputedField, Error, InlineError };
