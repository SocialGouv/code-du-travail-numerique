import { render } from "@testing-library/react";
import React from "react";

import { matopush } from "../../../piwik";
import { PrevNextBar } from "../PrevNextBar";

jest.mock("../../../piwik.js", () => ({
  matopush: jest.fn(),
}));

jest.spyOn(window, "print").mockImplementation();

describe("<PrevNextBar />", () => {
  it("should render", () => {
    const { container } = render(
      <PrevNextBar
        onPrev={jest.fn()}
        printVisible={false}
        hasError={false}
        nextVisible={false}
        previousVisible={false}
        simulatorTitle={"Test"}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it("should render only prev button", () => {
    const { container } = render(
      <PrevNextBar
        onPrev={jest.fn()}
        printVisible={false}
        hasError={false}
        nextVisible={false}
        previousVisible={true}
        simulatorTitle={"Test"}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render only next button", () => {
    const { container } = render(
      <PrevNextBar
        onPrev={jest.fn()}
        printVisible={false}
        hasError={false}
        nextVisible={true}
        previousVisible={false}
        simulatorTitle={"Test"}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render a disabled button", () => {
    const { container } = render(
      <PrevNextBar
        onPrev={jest.fn()}
        printVisible={false}
        hasError={false}
        nextVisible={false}
        previousVisible={false}
        simulatorTitle={"Test"}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should trigger onPrev", () => {
    const onPrev = jest.fn();
    const { getByText } = render(
      <PrevNextBar
        onPrev={onPrev}
        printVisible={false}
        hasError={false}
        nextVisible={false}
        previousVisible={true}
        simulatorTitle={"Test"}
      />
    );
    const prevButton = getByText(/précédent/i);
    prevButton.click();
    expect(onPrev).toHaveBeenCalled();
  });
  it("should trigger submit", () => {
    const onSubmit = jest.fn((event) => event.preventDefault());
    const { getByText } = render(
      <form onSubmit={onSubmit}>
        <PrevNextBar
          onPrev={jest.fn()}
          printVisible={false}
          hasError={false}
          nextVisible={true}
          previousVisible={true}
          simulatorTitle={"Test"}
        />
      </form>
    );
    const nextButton = getByText(/suivant/i);
    nextButton.click();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("should trigger a matomo event", () => {
    const simulatorName = "Test";
    const { getByText } = render(
      <PrevNextBar
        onPrev={jest.fn()}
        printVisible={true}
        hasError={false}
        nextVisible={false}
        previousVisible={false}
        simulatorTitle={simulatorName}
      />
    );
    const printButton = getByText(/imprimer/i);
    printButton.click();
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "click_print",
      simulatorName,
    ]);
    expect(window.print).toHaveBeenCalled();
  });
});
