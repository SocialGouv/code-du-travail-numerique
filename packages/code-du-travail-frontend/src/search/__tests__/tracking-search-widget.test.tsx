import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { push } from "@socialgouv/matomo-next";
import { SearchWidget } from "../SearchWidget";
import { byRole, byTitle } from "testing-library-selector";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("Widget Search - Tracking", () => {
  beforeEach(() => {
    render(<SearchWidget></SearchWidget>);
  });

  test("clicks are tracked", () => {
    fireEvent.click(
      byTitle(
        "Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail."
      ).get()
    );
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "widget_search",
      "click_logo",
    ]);
    fireEvent.click(byRole("button").get());

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "widget_search",
      "submit_search",
    ]);
  });
});
