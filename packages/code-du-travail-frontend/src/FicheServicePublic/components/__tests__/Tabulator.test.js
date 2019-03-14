import React from "react";
import { render } from "react-testing-library";
import Tabulator from "../Tabulator";
import tabulatorDataMock from "./mocks/tabulatorData.json";

describe("<Tabulator />", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should incease heading levels if not 0", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render", () => {
    const { container } = render(
      <Tabulator data={tabulatorDataMock} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
