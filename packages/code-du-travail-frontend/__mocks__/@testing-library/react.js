/* eslint-disable import/export */
import { theme } from "@socialgouv/cdtn-ui";
import { render } from "@testing-library/react";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "styled-components";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme.colors}>
      <>{children}</>
    </ThemeProvider>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
