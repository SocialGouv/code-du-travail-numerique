import React from "react";
import { render } from "@testing-library/react";
import { LienExterne, LienExterneCommente } from "../LienExterne";
import lienExterneCommenteDataMock from "./mocks/lienExterneCommenteData.json";
import lienExterneDataMock from "./mocks/lienExterneData.json";
import {
  FicheSPDataLienExterne,
  FicheSPDataLienExterneCommente,
} from "../../type";

describe("<LienExterneCommente />", () => {
  it("should render", () => {
    const { container } = render(
      <LienExterneCommente
        data={lienExterneCommenteDataMock as FicheSPDataLienExterneCommente}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
describe("<LienExterne />", () => {
  it("should render", () => {
    const { container } = render(
      <LienExterne data={lienExterneDataMock as FicheSPDataLienExterne} />
    );
    expect(container).toMatchSnapshot();
  });
});
