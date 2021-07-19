import { render } from "@testing-library/react";
import React from "react";

import { ViewMore } from "./index.js";

const arrayOfData = [
  "data-1",
  "data-2",
  "data-3",
  "data-4",
  "data-5",
  "data-6",
  "data-7",
  "data-8",
  "data-9",
  "data-10",
  "data-11",
];

describe("<ViewMore />", () => {
  it("renders with an button", () => {
    const { container, getByText, queryByText } = render(
      <ViewMore>
        {arrayOfData.map((data) => (
          <li key={`example-1-${data}`}>
            <a href="/">{data}</a>
          </li>
        ))}
      </ViewMore>
    );
    expect(container).toMatchSnapshot();
    expect(queryByText("data-11")).toBeFalsy();
    const unfoldButton = getByText("Voir plus");
    unfoldButton.click();
    expect(queryByText("data-11")).toBeTruthy();
  });
  it("renders with the given size", () => {
    const { getByText, queryByText } = render(
      <ViewMore initialSize={4} stepSize={2}>
        {arrayOfData.map((data) => (
          <li key={`example-1-${data}`}>
            <a href="/">{data}</a>
          </li>
        ))}
      </ViewMore>
    );
    expect(queryByText("data-6")).toBeFalsy();
    const unfoldButton = getByText("Voir plus");
    unfoldButton.click();
    expect(queryByText("data-6")).toBeTruthy();
    expect(queryByText("Voir plus")).toBeTruthy();
  });
  it("renders with a tolerance", () => {
    const { queryByText } = render(
      <ViewMore initialSize={9}>
        {arrayOfData.map((data) => (
          <li key={`example-1-${data}`}>
            <a href="/">{data}</a>
          </li>
        ))}
      </ViewMore>
    );
    expect(queryByText("data-11")).toBeTruthy();
    expect(queryByText("Voir plus")).toBeFalsy();
  });
});
