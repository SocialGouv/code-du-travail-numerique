import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Alert } from "@socialgouv/react-ui";

function ErrorField({ name }) {
  return (
    <Field
      name={name}
      subscription={{ error: true, dirty: true, touched: true }}
      render={({ meta: { error, dirty, touched } }) =>
        (error && touched) || (error && dirty) ? <Alert>{error}</Alert> : null
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
      render={({ meta: { error } }) => (error ? <Alert>{error}</Alert> : null)}
    />
  );
}
ErrorComputedField.propTypes = {
  name: PropTypes.string.isRequired
};

export { ErrorField, ErrorComputedField };
