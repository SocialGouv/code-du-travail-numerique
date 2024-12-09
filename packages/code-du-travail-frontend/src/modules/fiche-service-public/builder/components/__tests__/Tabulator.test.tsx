import { render } from "@testing-library/react";
import React from "react";

import Tabulator from "../Tabulator";
import tabulatorDataMock from "./mocks/tabulatorData.json";
import { FicheSPDataListeSituations } from "../../type";

describe("<Tabulator />", () => {
  it("should render", () => {
    const { container } = render(
      <Tabulator
        data={tabulatorDataMock as FicheSPDataListeSituations}
        headingLevel={2}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should have two different levels of headings", () => {
    const { getAllByRole } = render(
      <Tabulator
        data={tabulatorDataMock as FicheSPDataListeSituations}
        headingLevel={0}
      />
    );
    const h2 = getAllByRole("heading", { level: 2 });
    expect(h2[0].textContent).toEqual("CDI");
    expect(h2[1].textContent).toEqual("CDD");

    const h3 = getAllByRole("heading", { level: 3 });
    expect(h3[0].textContent).toEqual("titre 1");
    expect(h3[1].textContent).toEqual("titre 2");
  });
  it("should increase heading levels if not 0", () => {
    const { getAllByRole } = render(
      <Tabulator
        data={tabulatorDataMock as FicheSPDataListeSituations}
        headingLevel={1}
      />
    );
    const h3 = getAllByRole("heading", { level: 3 });
    expect(h3[0].textContent).toEqual("CDI");
  });
});
