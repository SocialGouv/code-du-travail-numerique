import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

type Props = {
  name: string;
  errorText?: string;
};

const ErrorField = ({ name, errorText }: Props): JSX.Element => (
  <Field
    name={name}
    subscription={{ error: true, submitFailed: true, touched: true }}
    render={({ meta: { error, submitFailed } }) => {
      if (!submitFailed || !error) {
        return null;
      }
      if (errorText) {
        return <Error>{errorText}</Error>;
      }
      if (typeof error === "string") {
        return <Error>{error}</Error>;
      }
      return error;
    }}
  />
);

const ErrorComputedField = ({ name }: Props): JSX.Element => (
  <Field
    name={name}
    render={({ meta: { error } }) => (error ? <Error>{error}</Error> : null)}
  />
);

const Error = styled.p`
  margin: ${theme.spacings.small} 0 ${theme.spacings.base};
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  font-size: ${theme.fonts.sizes.small};
`;

const InlineError = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <Error as="span">{children}</Error>;

export { Error, ErrorComputedField, ErrorField, InlineError };
