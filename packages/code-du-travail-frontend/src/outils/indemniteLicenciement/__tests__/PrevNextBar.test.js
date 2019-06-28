import React from "react";
import { render } from "react-testing-library";
import { PrevNextBar } from "../PrevNextBar";

const props = {
  currentStepIndex: 1,
  stepsLength: 3,
  onPrev: () => {}
};

describe("<PrevNextBar />", () => {
  it("should render", () => {
    const { container } = render(<PrevNextBar {...props} />);
    expect(container).toMatchSnapshot();
  });
  it("should render only prev button", () => {
    const { container } = render(
      <PrevNextBar {...props} currentStepIndex={2} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render only next button", () => {
    const { container } = render(
      <PrevNextBar {...props} currentStepIndex={0} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render disabled buttons", () => {
    const { container } = render(<PrevNextBar {...props} disabled />);
    expect(container).toMatchSnapshot();
  });
  it("should trigger onPrev", () => {
    const onPrev = jest.fn();
    const { getByText } = render(<PrevNextBar {...props} onPrev={onPrev} />);
    const prevButton = getByText(/précédent/i);
    prevButton.click();
    expect(onPrev).toHaveBeenCalled();
  });
  it("should trigger submit", () => {
    const onSubmit = jest.fn(event => event.preventDefault());
    const { getByText } = render(
      <form onSubmit={onSubmit}>
        <PrevNextBar {...props} />
      </form>
    );
    const nextButton = getByText(/suivant/i);
    nextButton.click();
    expect(onSubmit).toHaveBeenCalled();
  });
});
