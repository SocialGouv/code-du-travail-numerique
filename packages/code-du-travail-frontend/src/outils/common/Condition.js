import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

function Condition({ when, is, children }) {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) =>
        typeof is === "function"
          ? value && is(value)
            ? children
            : null
          : value === is
          ? children
          : null
      }
    </Field>
  );
}

Condition.propTypes = {
  when: PropTypes.string.isRequired,
  is: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
  children: PropTypes.node
};

export { Condition };
