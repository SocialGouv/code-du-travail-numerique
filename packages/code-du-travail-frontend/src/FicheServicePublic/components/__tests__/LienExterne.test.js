import React from "react";
import { render } from "react-testing-library";
import LienExterne from "../LienExterne";
import lienExterneDataMock from "./mocks/lienExterneData.json";

describe("<LienExterne />", () => {
  it("should render", () => {
    const { container } = render(<LienExterne data={lienExterneDataMock} />);
    expect(container).toMatchSnapshot();
  });
});
