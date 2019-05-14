import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Alert } from "@cdt/ui";

function ErrorField({ name }) {
  return (
    <Field
      name={name}
      subscribe={{ error: true, touched: true }}
      render={({ meta: { touched, error } }) =>
        error && touched ? <Alert>{error}</Alert> : null
      }
    />
  );
}

ErrorField.propTypes = {
  name: PropTypes.string.isRequired
};

export { ErrorField };
