import React from "react";
import { render } from "@testing-library/react";
import { PrevNextBar } from "../PrevNextBar";

describe("<PrevNextBar />", () => {
  it("should render", () => {
    const { container } = render(<PrevNextBar />);
    expect(container).toMatchSnapshot();
  });
  it("should render only prev button", () => {
    const { container } = render(<PrevNextBar nextVisible={false} />);
    expect(container).toMatchSnapshot();
  });
  it("should render only next button", () => {
    const { container } = render(<PrevNextBar prevVisible={false} />);
    expect(container).toMatchSnapshot();
  });
  it("should render disabled buttons", () => {
    const { container } = render(<PrevNextBar disabled />);
    expect(container).toMatchSnapshot();
  });
  it("should trigger onPrev", () => {
    const onPrev = jest.fn();
    const { getByText } = render(<PrevNextBar onPrev={onPrev} />);
    const prevButton = getByText(/précédent/i);
    prevButton.click();
    expect(onPrev).toHaveBeenCalled();
  });
  it("should trigger submit", () => {
    const onSubmit = jest.fn(event => event.preventDefault());
    const { getByText } = render(
      <form onSubmit={onSubmit}>
        <PrevNextBar />
      </form>
    );
    const nextButton = getByText(/suivant/i);
    nextButton.click();
    expect(onSubmit).toHaveBeenCalled();
  });
});
