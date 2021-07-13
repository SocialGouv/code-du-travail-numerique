import { cleanup, render } from "@testing-library/react";
import React from "react";
import styled from "styled-components";

import { Modal } from "./index.js";

// HACK(lionelB): trick to prevent @reach-modal warning if styles are not imported
// jsdom doesn"t support it for now @see https://github.com/jsdom/jsdom/issues/1895
// We will be able to use :
// document.documentElement.style.setProperty("--reach-modal", "1");
// when jsdom support it :)
//
// Meanwhile...
//
// HACK(douglasduteil): mock the check style function from `@reach/utils`
// As `@reach/*` packages are using the "checkStyles" function from `@reach/utils`
// to warn us about missing stylesheet, we silent it with a mock 💩
// eslint-disable-next-line import/no-extraneous-dependencies
require("@reach/utils").checkStyles = jest.fn();

// force cleanup dom since we use portal
afterEach(cleanup);

describe("<Modal />", () => {
  it("does not render at first and then render", () => {
    const onDismiss = () => {};
    const { baseElement, rerender } = render(
      <Modal isOpen={false} onDismiss={onDismiss} title="title">
        Some content
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
    rerender(
      <Modal isOpen={true} onDismiss={onDismiss} title="title">
        Some content
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("calls the callback when closing", () => {
    const onDismiss = jest.fn();
    const { getByTitle } = render(
      <Modal isOpen={true} onDismiss={onDismiss} title="title">
        Some content
      </Modal>
    );
    const closeBt = getByTitle("fermer la modale");
    closeBt.click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
  it("renders the provided wrapper", () => {
    const Span = styled.span`
      background-color: red;
    `;
    const onDismiss = jest.fn();
    const { baseElement } = render(
      <Modal
        isOpen={true}
        onDismiss={onDismiss}
        ContentWrapper={Span}
        title="title"
      >
        {"This won't be displayed"}
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
