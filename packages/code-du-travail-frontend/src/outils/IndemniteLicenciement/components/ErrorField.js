import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Alert } from "@cdt/ui";

function ErrorField({ name }) {
  return (
    <Field
      name={name}
      subscribe={{ error: true, dirty: true }}
      render={({ meta: { error, touched, dirty } }) =>
        (error && dirty) || (error && touched) ? <Alert>{error}</Alert> : null
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
      subscribe={{ error: true }}
      render={({ meta: { error } }) => (error ? <Alert>{error}</Alert> : null)}
    />
  );
}
ErrorComputedField.propTypes = {
  name: PropTypes.string.isRequired
};

export { ErrorField, ErrorComputedField };
