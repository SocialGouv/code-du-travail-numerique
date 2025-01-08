import React from "react";
import { render } from "@testing-library/react";
import Table from "../Table";
import tableDataMock from "./mocks/tableData.json";
import { FicheSPDataTableau } from "../../type";

describe("<Table />", () => {
  it("should render with th, td, colspan etc.", () => {
    const { container } = render(
      <Table data={tableDataMock as FicheSPDataTableau} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
