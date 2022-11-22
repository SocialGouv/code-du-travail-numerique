import { render } from "@testing-library/react";
import React from "react";

import Outils, { getServerSideProps } from "../pages/outils";

jest.mock("../src/outils/service.ts");

describe("<Outils />", () => {
  let serverSideProps: Awaited<ReturnType<typeof getServerSideProps>>;

  beforeAll(async () => {
    serverSideProps = await getServerSideProps();
  });

  it("should render", async () => {
    const { container } = render(<Outils {...serverSideProps.props} />);
    expect(container).toBeTruthy();
  });

  it("should display a list of tools", () => {
    const { getByTestId } = render(<Outils {...serverSideProps.props} />);
    const grid = getByTestId("tools-list");
    expect(grid.getElementsByTagName("a")).toHaveLength(11);
  });
});
