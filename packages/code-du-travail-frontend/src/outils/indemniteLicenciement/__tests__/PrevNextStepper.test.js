import React from "react";
import { render } from "react-testing-library";
import { PrevNextStepper } from "../PrevNextStepper";

describe("<PrevNextStepper />", () => {
  it("should render previous and next button", () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const { container } = render(
      <PrevNextStepper onPrev={onPrev} onNext={onNext} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render previous button and hide next button", () => {
    const onPrev = jest.fn();
    const { container } = render(<PrevNextStepper onPrev={onPrev} />);
    expect(container).toMatchSnapshot();
  });
  it("should hide previous button and render next button", () => {
    const onNext = jest.fn();
    const { container } = render(<PrevNextStepper onNext={onNext} />);
    expect(container).toMatchSnapshot();
  });
  it("should disabled next button", () => {
    const onNext = jest.fn();
    const { container } = render(
      <PrevNextStepper onNext={onNext} nextDisabled />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call onNext handler", () => {
    const onNext = jest.fn();
    const { getByText } = render(<PrevNextStepper onNext={onNext} />);
    const button = getByText(/suivant/i);
    button.click();
    expect(onNext).toHaveBeenCalled();
  });
  it("should call onPrev handler", () => {
    const onPrev = jest.fn();
    const { getByText } = render(<PrevNextStepper onPrev={onPrev} />);
    const button = getByText(/précédent/i);
    button.click();
    expect(onPrev).toHaveBeenCalled();
  });
});
