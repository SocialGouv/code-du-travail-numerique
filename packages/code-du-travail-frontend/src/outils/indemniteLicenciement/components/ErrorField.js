import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Alert } from "@cdt/ui";

function ErrorField({ name, immediate = false }) {
  return (
    <Field
      name={name}
      subscribe={{ error: true, touched: true, visited: immediate }}
      render={({ meta: { touched, error, visited } }) =>
        (error && touched) || (error && visited) ? <Alert>{error}</Alert> : null
      }
    />
  );
}

ErrorField.propTypes = {
  name: PropTypes.string.isRequired,
  immediate: PropTypes.bool
};

export { ErrorField };
