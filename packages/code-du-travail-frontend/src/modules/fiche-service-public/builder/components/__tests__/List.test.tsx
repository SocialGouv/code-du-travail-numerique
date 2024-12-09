import React from "react";
import { render } from "@testing-library/react";
import List from "../List";
import listDataMock from "./mocks/listData.json";
import { FicheSPDataList } from "../../type";

describe("<List />", () => {
  it("should render and increment heading level of children by one", () => {
    const { container } = render(
      <List data={listDataMock as FicheSPDataList} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
  });
});
