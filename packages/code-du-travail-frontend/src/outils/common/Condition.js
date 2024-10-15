import PropTypes from "prop-types";
import React from "react";
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
  children: PropTypes.node,
  is: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]).isRequired,
  when: PropTypes.string.isRequired,
};

export { Condition };
