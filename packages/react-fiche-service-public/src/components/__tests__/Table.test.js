import React from "react";
import { render } from "react-testing-library";
import Table from "../Table";
import tableDataMock from "./mocks/tableData.json";

describe("<Table />", () => {
  it("should render with th, td, colspan etc.", () => {
    const { container } = render(
      <Table data={tableDataMock} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
