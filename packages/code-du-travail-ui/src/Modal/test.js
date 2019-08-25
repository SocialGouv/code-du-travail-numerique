import React from "react";
import styled from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from ".";

describe("<Modal />", () => {
  it("does not render at first and then render", () => {
    const onDismiss = () => {};
    const { baseElement, rerender } = render(
      <Modal isOpen={false} onDismiss={onDismiss}>
        Some content
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
    rerender(
      <Modal isOpen={true} onDismiss={onDismiss}>
        Some content
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("calls the callback when closing", () => {
    const onDismiss = jest.fn();
    const { getByTitle } = render(
      <Modal isOpen={true} onDismiss={onDismiss}>
        Some content
      </Modal>
    );
    fireEvent.click(getByTitle("fermer la modale"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
  it("renders the provided wrapper", () => {
    const Span = styled.span`
      background-color: red;
    `;
    const onDismiss = jest.fn();
    const { baseElement } = render(
      <Modal isOpen={true} onDismiss={onDismiss} ContentWrapper={Span}>
        {"This won't be displayed"}
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
