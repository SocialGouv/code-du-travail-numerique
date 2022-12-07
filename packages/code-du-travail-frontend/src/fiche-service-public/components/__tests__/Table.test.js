import React from "react";
import { render } from "@testing-library/react";
import Table from "../Table";
import tableDataMock from "./mocks/tableData.json";

describe("<Table />", () => {
  it("should render with th, td, colspan etc.", () => {
    const { container } = render(
      <Table data={tableDataMock} headingLevel={2} />,
    );
    expect(container).toMatchSnapshot();
  });
});
