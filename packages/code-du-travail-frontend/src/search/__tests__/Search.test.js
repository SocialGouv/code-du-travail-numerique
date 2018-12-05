import React from "react";
import Search from "../Search";
import { fireEvent, waitForElement } from "react-testing-library";

import { renderWithMock } from "../../../test/MockNextContext";
import { suggestResults } from "../search.service";
import { Router } from "../../../routes";

jest.mock("../search.service.js", () => ({
  suggestResults: jest.fn(),
  searchResults: jest.fn()
}));

Router.pushRoute = jest.fn();

const suggestions = {
  hits: {
    hits: [
      {
        _source: {
          source: "faq",
          title: "faq title",
          slug: "faq-title"
        }
      }
    ]
  }
};

suggestResults.mockResolvedValue(Promise.resolve(suggestions));

describe("<search />", () => {
  it("should render", () => {
    const { container } = renderWithMock(<Search />);
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const { container, getAllByRole, getByPlaceholderText } = renderWithMock(
      <Search />
    );
    const input = getByPlaceholderText(
      /exemple: je travaille dans l'industrie chimique et n'ai pas eu de contrat de travail est-ce normal?/i
    );
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });
  it("should navigate when user change facet", () => {
    const { getBySelectText } = renderWithMock(<Search />);
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.change(select, { target: { value: "faq" } });
    expect(Router.pushRoute).toHaveBeenCalled();
  });
  //todo lionelb add moar tests
});
