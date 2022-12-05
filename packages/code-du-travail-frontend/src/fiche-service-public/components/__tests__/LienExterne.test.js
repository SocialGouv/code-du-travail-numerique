import React from "react";
import { render } from "@testing-library/react";
import { LienExterne, LienExterneCommente } from "../LienExterne";
import lienExterneCommenteDataMock from "./mocks/lienExterneCommenteData.json";
import lienExterneDataMock from "./mocks/lienExterneData.json";

describe("<LienExterneCommente />", () => {
  it("should render", () => {
    const { container } = render(
      <LienExterneCommente data={lienExterneCommenteDataMock} />,
    );
    expect(container).toMatchSnapshot();
  });
});
describe("<LienExterne />", () => {
  it("should render", () => {
    const { container } = render(<LienExterne data={lienExterneDataMock} />);
    expect(container).toMatchSnapshot();
  });
});
