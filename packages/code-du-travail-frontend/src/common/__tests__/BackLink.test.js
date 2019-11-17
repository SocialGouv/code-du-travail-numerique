import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { BackToResultsLink } from "../Answer";
import { matopush } from "../../piwik";

jest.mock("../../piwik", () => ({ matopush: jest.fn() }));
jest.mock("next/link", () => {
  return ({ children }) => children;
});

describe("backLink", () => {
  it("should push tracking events on click", () => {
    const { getByText } = render(<BackToResultsLink query={{ q: "camion" }} />);
    const link = getByText(/retour aux résultats/i);
    link.click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "backResults",
      "camion"
    ]);
  });
  it("should push tracking events on keyboard navigation", () => {
    const { getByText } = render(<BackToResultsLink query={{ q: "camion" }} />);
    const link = getByText(/retour aux résultats/i);
    fireEvent.keyPress(link, { event: { keyCode: 13 } });

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "backResults",
      "camion"
    ]);
  });
});
