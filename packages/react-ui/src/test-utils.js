import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
// eslint-disable-next-line import/no-extraneous-dependencies
import { colors } from "./theme";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={colors}>
      <>{children}</>
    </ThemeProvider>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
