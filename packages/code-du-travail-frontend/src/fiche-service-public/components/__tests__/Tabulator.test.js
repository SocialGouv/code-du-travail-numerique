import { render, screen } from "@testing-library/react";
import React from "react";

import Tabulator from "../Tabulator";
import tabulatorDataMock from "./mocks/tabulatorData.json";

describe("<Tabulator />", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent).toEqual("CDI");

    const h3 = screen.getByRole("heading", { level: 3 });
    expect(h3.textContent).toEqual("titre 1");
  });
  it("should incease heading levels if not 0", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
    const title = screen.getByRole("heading", { level: 3 });
    expect(title.textContent).toEqual("CDI");
  });
  it("should render", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
